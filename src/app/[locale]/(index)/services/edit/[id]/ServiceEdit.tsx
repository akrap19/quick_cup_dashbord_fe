'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Service } from 'api/models/services/service'
import { updateService } from 'api/services/services'
import { requiredString, servicePriceSchema } from 'schemas'

import ServiceForm from '../../form'
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

interface Props {
	service: Service
}

const ServiceEdit = ({ service }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Services.edit', backLabel: 'Services.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: service?.name,
			description: service?.description ?? null,
			buyPrices: service?.buyPrices ?? [],
			rentPrices: service?.rentPrices ?? [],
			priceCalculationUnit: service?.priceCalculationUnit,
			acquisitionType: service?.acquisitionType,
			billingInterval: service?.billingInterval,
			inputTypeForBuy: service?.inputTypeForBuy,
			inputTypeForRent: service?.inputTypeForRent,
			isDefaultServiceForBuy: service?.isDefaultServiceForBuy ?? false,
			isDefaultServiceForRent: service?.isDefaultServiceForRent ?? false
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateService({
			...dataWIhoutEmptyString,
			id: service?.id,
			buyPrices:
				data.buyPrices?.map(price => ({
					minQuantity: price.minQuantity,
					maxQuantity: price.maxQuantity,
					price: price.price
				})) ?? [],
			rentPrices:
				data.rentPrices?.map(price => ({
					minQuantity: price.minQuantity,
					maxQuantity: price.maxQuantity,
					price: price.price
				})) ?? []
		})

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Services.successfullyEdited')
			refresh()
			setTimeout(() => {
				back()
			}, 500)
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ServiceForm isEdit />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default ServiceEdit
