'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState, useMemo } from 'react'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { validateProductPrices, validateProductStates } from 'utils'
import { createProduct } from 'api/services/products'
import { ROUTES } from 'parameters'
import { productPriceSchema, productServicePriceSchema, productStateSchema, requiredString } from 'schemas'
import { Service } from 'api/models/services/service'
import { Base } from 'api/models/common/base'

import RentForm from '../form'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	unit: requiredString.shape.scheme,
	quantityPerUnit: z.coerce.number().min(1),
	transportationUnit: requiredString.shape.scheme,
	unitsPerTransportationUnit: z.coerce.number().min(1),
	description: z.string().optional(),
	imageIds: z.array(z.string()).optional(),
	prices: z.array(productPriceSchema).optional(),
	servicePrices: z.array(productServicePriceSchema).optional().default([]),
	productStates: z.array(productStateSchema).optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	servicesPrices: Service[]
	users: Base[]
	serviceLocations: Base[]
}

const RentAdd = ({ servicesPrices, users, serviceLocations }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	const [showServices, setShowServices] = useState(false)
	useNavbarItems({ title: 'Rent.add', backLabel: 'Rent.back' })

	const initialServicePrices = useMemo(
		() =>
			servicesPrices?.map(service => ({
				serviceId: service.serviceId,
				prices:
					service.rentPrices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) || []
			})),
		[servicesPrices]
	)

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			unit: '',
			quantityPerUnit: undefined,
			transportationUnit: '',
			unitsPerTransportationUnit: undefined,
			description: '',
			imageIds: undefined,
			prices: [{ minQuantity: undefined, maxQuantity: undefined, price: undefined }],
			servicePrices: initialServicePrices,
			productStates: [{} as any]
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()

		// Filter out invalid/empty prices - keep only valid entries with minQuantity and price
		const validPrices = validateProductPrices(data.prices)

		// Filter out invalid/empty product states - keep only valid entries with status, location, and quantity
		const validProductStates = validateProductStates(data.productStates)

		const hasPriceChanged = (initialPrice: any, currentPrice: any) => {
			return (
				initialPrice?.minQuantity !== currentPrice?.minQuantity ||
				initialPrice?.maxQuantity !== currentPrice?.maxQuantity ||
				initialPrice?.price !== currentPrice?.price
			)
		}

		const hasServiceChanged = (initialService: any, currentService: any) => {
			const initialPrices = initialService?.prices || []
			const currentPrices = currentService?.prices || []

			if (initialPrices.length !== currentPrices.length) {
				return true
			}

			for (let i = 0; i < currentPrices.length; i++) {
				if (hasPriceChanged(initialPrices[i], currentPrices[i])) {
					return true
				}
			}

			return false
		}

		const changedServices = data.servicePrices
			.map((currentService, index) => {
				const initialService = initialServicePrices[index]
				if (hasServiceChanged(initialService, currentService)) {
					return {
						serviceId: currentService.serviceId,
						prices: currentService.prices?.map((price: any) => ({
							minQuantity: price.minQuantity,
							maxQuantity: price.maxQuantity,
							price: price.price
						}))
					}
				}
				return null
			})
			.filter((service): service is NonNullable<typeof service> => service !== null)

		// No transformation needed - serviceLocationId is already the location ID
		const transformedProductStates = validProductStates

		const shortenedDataWithServicePrices = {
			...data,
			servicePrices: showServices && changedServices.length > 0 ? changedServices : undefined,
			productStates: transformedProductStates,
			prices: validPrices
		}

		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(shortenedDataWithServicePrices)
		const payload = {
			...dataWIhoutEmptyString,
			acquisitionType: AcquisitionTypeEnum.RENT
		}
		const result = await createProduct(payload)
		if (result?.message === 'OK') {
			SuccessToast(t('Rent.successfullyCreated'))
			push(ROUTES.RENT)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<RentForm
							cancelDialog={cancelDialog}
							showServices={showServices}
							setShowServices={setShowServices}
							servicesPrices={servicesPrices ?? []}
							form={form}
							users={users}
							serviceLocations={serviceLocations}
						/>
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Rent.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default RentAdd
