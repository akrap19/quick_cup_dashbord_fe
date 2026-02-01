'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { validateProductPrices, validateProductStates } from 'utils'
import { Product } from 'api/models/products/product'
import { updateProduct } from 'api/services/products'
import { productPriceSchema, productServicePriceSchema, productStateSchema, requiredString } from 'schemas'
import { Service } from 'api/models/services/service'
import { Base } from 'api/models/common/base'

import RentForm from '../../form'
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
	product: Product
	servicesPrices: Service[]
	users: Base[]
	serviceLocations: Base[]
}

const RentEdit = ({ product, servicesPrices, users, serviceLocations }: Props) => {
	const { back, refresh } = useRouter()
	const [showServices, setShowServices] = useState(false)
	useNavbarItems({ title: 'Rent.edit', backLabel: 'Rent.back' })

	const { initialImageIds, initialImageUrls } = useMemo(() => {
		const ids: string[] = []
		const urls: string[] = []

		product?.images?.forEach(img => {
			const id = img.id || img.imageId
			const url = img.url

			if (id && url) {
				ids.push(id)
				urls.push(url)
			}
		})

		return { initialImageIds: ids, initialImageUrls: urls }
	}, [product?.images])

	// Map product.servicePrices to form structure, matching by serviceId
	const initialProductServicePrices = useMemo(() => {
		return servicesPrices?.map(service => {
			// Find matching product service price by serviceId
			const productServicePrice = product.servicePrices?.find(sp => sp.serviceId === service.serviceId)

			return {
				serviceId: service.serviceId,
				prices:
					productServicePrice?.prices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) ||
					service.prices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) ||
					[]
			}
		})
	}, [product?.servicePrices, servicesPrices])

	// Initial service prices from servicesPrices (for comparison)
	const initialServicePrices = useMemo(
		() =>
			servicesPrices?.map(service => ({
				serviceId: service.serviceId,
				prices:
					service.prices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) || []
			})),
		[servicesPrices]
	)

	// Normalize productStates to match form schema (extract only required fields, handle nested serviceLocation)
	const normalizedProductStates = useMemo(() => {
		if (!product?.productStates || product.productStates.length === 0) {
			return []
		}

		return product.productStates.map(state => ({
			id: state.id,
			status: state.status,
			location: state.location,
			quantity: state.quantity,
			// Extract serviceLocationId from nested serviceLocation object if needed
			serviceLocationId: state.serviceLocationId || (state.serviceLocation as any)?.id || undefined,
			userId: state.userId || undefined
		}))
	}, [product?.productStates])

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product?.name ?? '',
			unit: product?.unit ?? '',
			quantityPerUnit: product?.quantityPerUnit ?? undefined,
			transportationUnit: product?.transportationUnit ?? '',
			unitsPerTransportationUnit: product?.unitsPerTransportationUnit ?? undefined,
			description: product?.description ?? '',
			imageIds: initialImageIds,
			prices:
				product?.prices && product.prices.length > 0
					? product.prices
					: [{ minQuantity: undefined, maxQuantity: undefined, price: undefined }],
			servicePrices: initialProductServicePrices,
			productStates: normalizedProductStates
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const currentImageIds = (data.imageIds || []) as string[]

		const imageIdsToAdd = currentImageIds.filter(id => !initialImageIds.includes(id))

		const imageIdsToRemove = initialImageIds.filter(id => !currentImageIds.includes(id))

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

		// Compare current form values with initial servicesPrices (not product.servicePrices)
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

		// Transform productStates to only include required fields: status, location, quantity, serviceLocationId, userId
		const transformedProductStates = validProductStates.map((state: any) => ({
			status: state.status,
			location: state.location,
			quantity: state.quantity,
			serviceLocationId: state.serviceLocationId || null,
			userId: state.userId || null
		}))

		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)

		// Exclude imageIds from payload
		const { imageIds, ...dataWithoutImageIds } = dataWIhoutEmptyString

		const shortenedDataWithServicePrices = {
			...dataWithoutImageIds,
			servicePrices: showServices && changedServices.length > 0 ? changedServices : undefined,
			productStates: transformedProductStates
		}

		const result = await updateProduct(product?.id, {
			...shortenedDataWithServicePrices,
			acquisitionType: AcquisitionTypeEnum.RENT,
			imageIdsToAdd,
			imageIdsToRemove,
			prices: validPrices.map((price: any) => ({
				minQuantity: price.minQuantity,
				maxQuantity: price.maxQuantity,
				price: price.price
			}))
		})

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Rent.successfullyEdited')

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
					<RentForm
						initialImageUrls={initialImageUrls}
						isEdit
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
	)
}

export default RentEdit
