'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { Order } from 'api/models/order/order'
import { OrderPayload } from 'api/models/order/orderPayload'
import { OrderProduct } from 'api/models/order/orderProduct'
import { updateOrder } from 'api/services/orders'
import { ROUTES } from 'parameters'
import { optionalPhoneNumberScheme, requiredString } from 'schemas'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import { OrderForm } from '../../form'
import { Base } from 'api/models/common/base'
import { Product } from 'api/models/products/product'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'

const orderProductSchema = z.object({
	productId: requiredString.shape.scheme,
	quantity: z.coerce.number().min(1),
	price: z.coerce.number().min(0)
})

const additionalCostSchema = z.object({
	additionalCostId: z.string(),
	isIncluded: z.boolean().default(false),
	quantity: z.coerce.number().min(0).default(0),
	price: z.coerce.number().min(0).default(0)
})

const formSchema = z.object({
	acquisitionType: z.nativeEnum(AcquisitionTypeEnum),
	customerId: requiredString.shape.scheme,
	eventId: z.string().optional(),
	location: z.string().optional(),
	place: requiredString.shape.scheme,
	street: requiredString.shape.scheme,
	contactPerson: z.string().optional(),
	contactPersonContact: optionalPhoneNumberScheme.shape.phone,
	products: z.array(orderProductSchema).min(1),
	services: z
		.array(
			z.object({
				serviceId: z.string(),
				isIncluded: z.boolean().default(false),
				quantity: z.number(),
				price: z.number(),
				productQuantities: z.record(z.string(), z.number()).optional()
			})
		)
		.optional()
		.default([]),
	additionalCosts: z.array(additionalCostSchema).optional().default([]),
	totalAmount: z.coerce.number().min(0),
	notes: z.string().max(500).optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	order: Order
	clients: Base[]
	events: Base[]
	products: Product[]
	additionalCosts: AdditionalCosts[]
}

const OrderEdit = ({ order, clients, events, products, additionalCosts }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Orders.edit', backLabel: 'Orders.back' })

	const initialProducts = useMemo(() => {
		if (order?.products && order.products.length > 0) {
			return order.products.map(orderProduct => ({
				productId: orderProduct.productId,
				quantity: orderProduct.quantity,
				price: orderProduct.price
			}))
		}
		return []
	}, [order?.products])

	const initialAdditionalCosts = useMemo(() => {
		if (order?.additionalCosts && order.additionalCosts.length > 0 && additionalCosts.length > 0) {
			// Map existing order additional costs to form structure
			return additionalCosts.map(ac => {
				const existingOrderCost = order.additionalCosts?.find(oac => oac.additionalCostId === ac.id)
				if (existingOrderCost) {
					return {
						additionalCostId: ac.id,
						isIncluded: true,
						quantity: existingOrderCost.quantity || 0,
						price: existingOrderCost.price || 0
					}
				}
				return {
					additionalCostId: ac.id,
					isIncluded: false,
					quantity: 0,
					price: 0
				}
			})
		}
		// If no existing order costs, initialize all as not included
		return additionalCosts.map((ac: AdditionalCosts) => ({
			additionalCostId: ac.id,
			isIncluded: false,
			quantity: 0,
			price: 0
		}))
	}, [order?.additionalCosts, additionalCosts])

	const initialServices = useMemo(() => {
		const serviceMap = new Map<string, { serviceId: string; isIncluded: boolean; quantity: number; price: number }>()
		const isRent = order?.acquisitionType === AcquisitionTypeEnum.RENT

		// Create a map of order services for quick lookup
		const orderServicesMap = new Map()
		if (order?.services && order.services.length > 0) {
			order.services.forEach((orderService: any) => {
				orderServicesMap.set(orderService.serviceId, {
					quantity: orderService.quantity || 0,
					price: orderService.price || 0
				})
			})
		}

		// Collect ALL services from products.servicePrices (show all available services)
		products.forEach((product: Product) => {
			if (product.servicePrices && product.servicePrices.length > 0) {
				product.servicePrices.forEach(service => {
					const serviceId = service.id || service.serviceId
					if (serviceId && !serviceMap.has(serviceId)) {
						// Check if this service is in the order
						const orderService = orderServicesMap.get(serviceId)
						// Check if service is default for this acquisition type
						const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

						serviceMap.set(serviceId, {
							serviceId: serviceId,
							// Include if it's default OR if it's in the order
							isIncluded: isDefault || !!orderService,
							quantity: orderService?.quantity || 0,
							price: orderService?.price || 0
						})
					}
				})
			}
		})

		// Add any services from order.services that aren't in products (edge case)
		if (order?.services && order.services.length > 0) {
			order.services.forEach((orderService: any) => {
				const serviceId = orderService.serviceId
				if (serviceId && !serviceMap.has(serviceId)) {
					serviceMap.set(serviceId, {
						serviceId: serviceId,
						isIncluded: true, // If it's in order.services, it should be included
						quantity: orderService.quantity || 0,
						price: orderService.price || 0
					})
				}
			})
		}

		return Array.from(serviceMap.values())
	}, [products, order?.services, order?.acquisitionType])

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			acquisitionType: order?.acquisitionType ?? AcquisitionTypeEnum.BUY,
			customerId: order?.customerId ?? '',
			eventId: order?.eventId ?? '',
			location: order?.location ?? '',
			place: order?.place ?? '',
			street: order?.street ?? '',
			contactPerson: order?.contactPerson ?? '',
			contactPersonContact: order?.contactPersonContact ?? '',
			products:
				initialProducts.length > 0
					? initialProducts
					: products.length > 0
						? [{ productId: products[0].id, quantity: 0, price: 0 }]
						: [],
			services: initialServices,
			additionalCosts: initialAdditionalCosts,
			totalAmount: order?.totalAmount ?? 0,
			notes: order?.notes ?? ''
		}
	})

	useEffect(() => {
		if (order?.products && order.products.length > 0) {
			const mappedProducts = order.products.map(orderProduct => ({
				productId: orderProduct.productId,
				quantity: orderProduct.quantity,
				price: orderProduct.price
			}))

			form.setValue('products', mappedProducts, { shouldValidate: false })
			form.setValue('totalAmount', order.totalAmount || 0, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order])

	const formProducts = useWatch({ control: form.control, name: 'products' }) || []
	const servicesWatch = useWatch({ control: form.control, name: 'services' }) || []
	const additionalCostsWatch = useWatch({ control: form.control, name: 'additionalCosts' }) || []
	const isRent = order?.acquisitionType === AcquisitionTypeEnum.RENT

	useEffect(() => {
		const productsTotal = formProducts.reduce((sum, product) => sum + (product.price || 0), 0)
		const servicesTotal = servicesWatch.reduce((sum, formService) => {
			// Check if service is default by finding it in products
			let isDefault = false
			products.forEach((product: Product) => {
				if (product.servicePrices && product.servicePrices.length > 0) {
					const service = product.servicePrices.find(
						s => (s.id && s.id === formService.serviceId) || (s.serviceId && s.serviceId === formService.serviceId)
					)
					if (service) {
						isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
						if (isDefault) return
					}
				}
			})
			// Include price if service is included OR if it's default
			return sum + (formService.isIncluded || isDefault ? formService.price || 0 : 0)
		}, 0)
		const additionalCostsTotal = additionalCostsWatch.reduce(
			(sum, additionalCost) => sum + (additionalCost.isIncluded ? additionalCost.price || 0 : 0),
			0
		)
		const totalAmount = productsTotal + servicesTotal + additionalCostsTotal

		form.setValue('totalAmount', totalAmount, { shouldValidate: false, shouldDirty: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formProducts, servicesWatch, additionalCostsWatch, products, isRent])

	const onSubmit = async () => {
		const formData = form.getValues()

		const payload: OrderPayload = {
			id: order.id,
			acquisitionType: formData.acquisitionType,
			customerId: formData.customerId,
			eventId: formData.eventId,
			location: formData.location?.trim(),
			place: formData.place.trim(),
			street: formData.street.trim(),
			contactPerson: formData.contactPerson?.trim(),
			contactPersonContact: formData.contactPersonContact?.trim(),
			products: formData.products.map(p => ({
				productId: p.productId,
				quantity: Number(p.quantity) || 0,
				price: Number(p.price) || 0
			})) as OrderProduct[],
			services: (formData.services || [])
				.filter(s => {
					// Always include default services, otherwise check isIncluded
					let isDefault = false
					products.forEach((product: Product) => {
						if (product.servicePrices && product.servicePrices.length > 0) {
							const service = product.servicePrices.find(
								svc => (svc.id && svc.id === s.serviceId) || (svc.serviceId && svc.serviceId === s.serviceId)
							)
							if (service) {
								isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
								if (isDefault) return
							}
						}
					})
					return s.isIncluded || isDefault
				})
				.map(s => ({
					serviceId: s.serviceId,
					quantity: Number(s.quantity) || 0,
					price: Number(s.price) || 0
				})),
			additionalCosts: formData.additionalCosts
				.filter(ac => ac.isIncluded)
				.map(ac => {
					const additionalCost = additionalCosts.find(acc => acc.id === ac.additionalCostId)
					const isOneTime = additionalCost?.billingType === BillingTypeEnum.ONE_TIME
					return {
						additionalCostId: ac.additionalCostId,
						quantity: isOneTime ? 1 : Number(ac.quantity) || 0,
						price: Number(ac.price) || 0
					}
				}),
			totalAmount: formData.totalAmount,
			notes: formData.notes?.trim() ? formData.notes.trim() : null
		}

		const result = await updateOrder(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyEdited'))
			push(ROUTES.ORDERS)
			refresh()
		}
	}

	const productsToDisplay = useMemo(() => {
		if (formProducts.length === 0) {
			return []
		}

		const productMap = new Map(products.map(p => [p.id, p]))

		const matchedProducts = formProducts
			.map(formProduct => {
				return productMap.get(formProduct.productId)
			})
			.filter((p): p is Product => p !== undefined)

		return matchedProducts
	}, [formProducts, products])

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<OrderForm
							cancelDialog={cancelDialog}
							customers={clients}
							events={events}
							products={productsToDisplay}
							additionalCosts={additionalCosts}
							isEditMode={true}
							orderStatus={order?.status}
							acquisitionType={order?.acquisitionType}
						/>
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default OrderEdit
