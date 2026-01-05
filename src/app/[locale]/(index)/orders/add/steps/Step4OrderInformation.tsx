'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'

import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { Base } from 'api/models/common/base'
import { tokens } from '@/style/theme.css'
import { requiredString } from 'schemas'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useOrderWizardStore, Step4OrderInformationData } from '@/store/order-wizard'

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
	notes: z.string().max(500).optional()
})

type Step4Schema = z.infer<typeof step4Schema>

interface Props {
	events: Base[]
	acquisitionType: AcquisitionTypeEnum
}

export const Step4OrderInformation = ({ events, acquisitionType }: Props) => {
	const t = useTranslations()
	const { getStep4Data, getCustomerId, setStep4Data, setAcquisitionType } = useOrderWizardStore()
	const step4Data = getStep4Data(acquisitionType)
	const customerId = getCustomerId(acquisitionType)

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
			notes: step4Data?.notes || ''
		}
	})

	// Set acquisition type in store
	useEffect(() => {
		setAcquisitionType(acquisitionType)
	}, [acquisitionType, setAcquisitionType])

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
				notes: data.notes
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
							options={events}
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
				</div>
			</Stack>
		</FormProvider>
	)
}
