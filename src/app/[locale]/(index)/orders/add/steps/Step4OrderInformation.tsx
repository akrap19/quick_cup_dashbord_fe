'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useRef } from 'react'

import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { NumericInput } from '@/components/inputs/numeric-input'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { Base } from 'api/models/common/base'
import { tokens } from '@/style/theme.css'
import { requiredString } from 'schemas'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useOrderWizardStore, Step4OrderInformationData } from '@/store/order-wizard'
import { Event } from 'api/models/event/event'
import { applyDiscount } from '@/utils/discount'
import { Order } from 'api/models/order/order'

const step4Schema = z.object({
	acquisitionType: z.nativeEnum(AcquisitionTypeEnum),
	eventId: z.string().optional(),
	location: z.string().optional(),
	place: requiredString.shape.scheme,
	street: requiredString.shape.scheme,
	contactPerson: z.string().optional(),
	contactPersonContact: z
		.string()
		.optional()
		.refine(
			val => {
				if (!val || val.trim() === '') return true
				return /^([+]?[\s0-9\-()]+){3,30}$/.test(val)
			},
			{ message: 'ValidationMeseges.phone' }
		),
	notes: z.string().max(500).optional(),
	discount: z.coerce.number().min(0).max(100).optional()
})

type Step4Schema = z.infer<typeof step4Schema>

interface Props {
	events: Event[]
	acquisitionType: AcquisitionTypeEnum
	isAdmin?: boolean
	order?: Order
}

export const Step4OrderInformation = ({ events, acquisitionType, isAdmin = false, order }: Props) => {
	const t = useTranslations()
	const {
		getStep4Data,
		getStep1Data,
		getStep2Data,
		getStep3Data,
		getCustomerId,
		setStep4Data,
		setAcquisitionType,
		setTotalAmount
	} = useOrderWizardStore()
	const step4Data = getStep4Data(acquisitionType)
	const step1Data = getStep1Data(acquisitionType)
	const step2Data = getStep2Data(acquisitionType)
	const step3Data = getStep3Data(acquisitionType)
	const customerId = getCustomerId(acquisitionType)

	// Track if this is the first callback to skip initial calculation
	const isFirstCallback = useRef(true)

	// Transform events to Base[] format for dropdown
	const eventOptions: Base[] = events?.map(event => ({
		id: event.id,
		name: event.title
	}))

	const form = useForm<Step4Schema>({
		mode: 'onChange',
		resolver: zodResolver(step4Schema),
		defaultValues: {
			acquisitionType: (step4Data?.acquisitionType as AcquisitionTypeEnum | undefined) ?? acquisitionType,
			eventId: step4Data?.eventId || undefined,
			location: step4Data?.location || '',
			place: step4Data?.place || '',
			street: step4Data?.street || '',
			contactPerson: step4Data?.contactPerson || '',
			contactPersonContact: step4Data?.contactPersonContact || undefined,
			notes: step4Data?.notes || '',
			discount: step4Data?.discount !== undefined && step4Data?.discount !== null ? step4Data.discount : undefined
		}
	})

	// Watch for eventId changes and auto-fill location, place, and street
	const eventId = useWatch({
		control: form.control,
		name: 'eventId'
	})

	useEffect(() => {
		if (eventId) {
			const selectedEvent = events?.find(event => event.id === eventId)
			if (selectedEvent) {
				form.setValue('location', selectedEvent.location || '', { shouldValidate: true })
				form.setValue('place', selectedEvent.place || '', { shouldValidate: true })
				form.setValue('street', selectedEvent.street || '', { shouldValidate: true })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventId, events])

	// Set acquisition type in store
	useEffect(() => {
		setAcquisitionType(acquisitionType)
	}, [acquisitionType, setAcquisitionType])

	// Watch for discount changes to recalculate total
	const discount = useWatch({
		control: form.control,
		name: 'discount'
	})

	// Recalculate total amount when discount or step data changes
	useEffect(() => {
		// Skip calculation on first callback (when navigating to step)
		if (isFirstCallback.current) {
			isFirstCallback.current = false
			return
		}

		// Calculate base total from all steps
		const step1Total = step1Data?.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
		const step2Total =
			step2Data?.services?.reduce((sum, s) => {
				return sum + (s.isIncluded ? s.price || 0 : 0)
			}, 0) || 0
		const step3Total =
			step3Data?.additionalCosts?.reduce((sum, ac) => sum + (ac.isIncluded ? ac.price || 0 : 0), 0) || 0

		const baseTotal = step1Total + step2Total + step3Total

		// In edit mode, check if prices match order prices (already discounted)
		// If they match and discount hasn't changed, don't apply discount again
		let shouldApplyDiscount = true
		if (order) {
			const orderProductsTotal = order.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
			const orderServicesTotal = order.services?.reduce((sum, s) => sum + (s.price || 0), 0) || 0
			const orderAdditionalCostsTotal = order.additionalCosts?.reduce((sum, ac) => sum + (ac.price || 0), 0) || 0

			const step1Matches = Math.abs(step1Total - orderProductsTotal) < 0.001
			const step2Matches = Math.abs(step2Total - orderServicesTotal) < 0.001
			const step3Matches = Math.abs(step3Total - orderAdditionalCostsTotal) < 0.001
			const discountMatches = Math.abs((discount || 0) - (order.discount || 0)) < 0.001

			// If all match and discount hasn't changed, prices are already discounted, so don't apply discount again
			if (step1Matches && step2Matches && step3Matches && discountMatches) {
				shouldApplyDiscount = false
			}
		}

		// Apply discount only if needed
		const finalTotal = shouldApplyDiscount ? applyDiscount(baseTotal, discount) : baseTotal
		setTotalAmount(finalTotal, acquisitionType)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [discount, step1Data, step2Data, step3Data, acquisitionType, setTotalAmount, order])

	// Save to store when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const stepData: Step4OrderInformationData = {
				acquisitionType: data.acquisitionType as AcquisitionTypeEnum,
				eventId: data.eventId,
				location: data.location,
				place: data.place,
				street: data.street,
				contactPerson: data.contactPerson,
				contactPersonContact: data.contactPersonContact,
				notes: data.notes,
				discount: data.discount
			}
			setStep4Data(stepData, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

	return (
		<FormProvider {...form}>
			<Stack gap={6}>
				<Text fontSize="small" color="destructive.500">
					{t('General.requiredFieldWarning')}
				</Text>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						columnGap: tokens.spacing[6],
						rowGap: tokens.spacing[8]
					}}>
					<FormControl name="eventId">
						<FormControl.Label>{t('General.event')}</FormControl.Label>
						<SearchDropdown
							options={eventOptions}
							placeholder={t('General.event')}
							disabled={!customerId}
							alwaysShowSearch={true}
						/>
						<FormControl.Message />
					</FormControl>
					<FormControl name="location">
						<FormControl.Label>{t('General.location')}</FormControl.Label>
						<TextInput placeholder={t('General.locationPlaceholder')} autoComplete="off" />
						<FormControl.Message />
					</FormControl>
					<FormControl name="place">
						<FormControl.Label>
							<RequiredLabel>{t('General.placeAndPostalCode')}</RequiredLabel>
						</FormControl.Label>
						<TextInput placeholder={t('General.placeAndPostalCodePlaceholder')} autoComplete="off" />
						<FormControl.Message />
					</FormControl>
					<FormControl name="street">
						<FormControl.Label>
							<RequiredLabel>{t('General.streetAndNumber')}</RequiredLabel>
						</FormControl.Label>
						<TextInput placeholder={t('General.streetAndNumberPlaceholder')} autoComplete="off" />
						<FormControl.Message />
					</FormControl>
					<FormControl name="contactPerson">
						<FormControl.Label>{t('Orders.contactPerson')}</FormControl.Label>
						<TextInput placeholder={t('Orders.contactPersonPlaceholder')} autoComplete="off" />
						<FormControl.Message />
					</FormControl>
					<FormControl name="contactPersonContact">
						<FormControl.Label>{t('Orders.contactPersonContact')}</FormControl.Label>
						<TextInput placeholder={t('Orders.contactPersonContactPlaceholder')} autoComplete="off" />
						<FormControl.Message />
					</FormControl>
					<FormControl name="notes" maxLength="500">
						<FormControl.Label>{t('General.notes')}</FormControl.Label>
						<Textarea placeholder={t('Orders.notesPlaceholder')} rows={4} />
						<FormControl.Message />
					</FormControl>
					{isAdmin && (
						<FormControl name="discount">
							<FormControl.Label>{t('Orders.discount')}</FormControl.Label>
							<NumericInput
								placeholder={t('Orders.discountPlaceholder') || '0-100'}
								autoComplete="off"
								allowNegative={false}
								decimalScale={2}
								maxLength={5}
							/>
							<FormControl.Message />
						</FormControl>
					)}
				</div>
			</Stack>
		</FormProvider>
	)
}
