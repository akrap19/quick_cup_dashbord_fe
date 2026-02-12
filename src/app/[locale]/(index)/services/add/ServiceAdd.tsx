'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createService } from 'api/services/services'
import { ROUTES } from 'parameters'
import { requiredString, servicePriceSchema } from 'schemas'

import ServiceForm from '../form'
import { PriceCalculationUnit } from 'enums/priceCalculationUnit'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingIntervalEnum } from 'enums/billingIntervalEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'

const formSchema = z
	.object({
		name: requiredString.shape.scheme,
		description: z.string().max(500).nullable().optional(),
		buyPrices: z.array(servicePriceSchema).optional().default([]),
		rentPrices: z.array(servicePriceSchema).optional().default([]),
		priceCalculationUnit: z.nativeEnum(PriceCalculationUnit, {
			required_error: 'ValidationMeseges.required'
		}),
		acquisitionType: z.union([z.nativeEnum(AcquisitionTypeEnum), z.literal('both')], {
			required_error: 'ValidationMeseges.required',
			invalid_type_error: 'ValidationMeseges.required'
		}),
		billingInterval: z.nativeEnum(BillingIntervalEnum, {
			required_error: 'ValidationMeseges.required'
		}),
		inputTypeForBuy: z.nativeEnum(InputTypeEnum).optional().nullable(),
		inputTypeForRent: z.nativeEnum(InputTypeEnum).optional().nullable(),
		isDefaultServiceForBuy: z.boolean().default(false),
		isDefaultServiceForRent: z.boolean().default(false)
	})
	.refine(
		data => {
			if (data.acquisitionType === AcquisitionTypeEnum.BUY || data.acquisitionType === 'both') {
				return data.buyPrices && data.buyPrices.length > 0
			}
			return true
		},
		{
			message: 'Services.atLeastOneServicePriceRequired',
			path: ['buyPrices']
		}
	)
	.refine(
		data => {
			if (data.acquisitionType === AcquisitionTypeEnum.RENT || data.acquisitionType === 'both') {
				return data.rentPrices && data.rentPrices.length > 0
			}
			return true
		},
		{
			message: 'Services.atLeastOneServicePriceRequired',
			path: ['rentPrices']
		}
	)

type Schema = z.infer<typeof formSchema>

const ServiceAdd = () => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Services.add', backLabel: 'Services.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: null,
			buyPrices: [],
			rentPrices: [],
			priceCalculationUnit: undefined,
			acquisitionType: undefined,
			billingInterval: undefined,
			inputTypeForBuy: undefined,
			inputTypeForRent: undefined,
			isDefaultServiceForBuy: false,
			isDefaultServiceForRent: false
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()

		// Filter out empty price objects (objects where price is undefined/null)
		const filteredBuyPrices = (data.buyPrices || []).filter(price => price.price !== undefined && price.price !== null)
		const filteredRentPrices = (data.rentPrices || []).filter(
			price => price.price !== undefined && price.price !== null
		)

		const dataWithFilteredPrices = {
			...data,
			buyPrices: filteredBuyPrices,
			rentPrices: filteredRentPrices
		}

		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(dataWithFilteredPrices)
		const result = await createService(dataWIhoutEmptyString)

		if (result?.message === 'OK') {
			SuccessToast(t('Services.successfullyCreated'))

			refresh()
			push(ROUTES.SERVICES)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<ServiceForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Services.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default ServiceAdd
