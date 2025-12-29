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
import { OrderPayload } from 'api/models/order/orderPayload'
import { OrderProduct } from 'api/models/order/orderProduct'
import { createOrder } from 'api/services/orders'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import { OrderForm } from '../form'
import { Base } from 'api/models/common/base'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { Product } from 'api/models/products/product'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'

const orderProductSchema = z.object({
	productId: requiredString.shape.scheme,
	quantity: z.coerce.number().min(0),
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
	products: z
		.array(orderProductSchema)
		.min(1)
		.refine(products => products.some(p => Number(p.quantity) > 0), {
			message: 'At least one product must have quantity greater than 0'
		}),
	services: z
		.array(
			z.object({
				serviceId: z.string(),
				isIncluded: z.boolean().default(false),
				quantity: z.coerce.number().min(0),
				price: z.coerce.number().min(0),
				productQuantities: z.record(z.string(), z.coerce.number().min(0)).optional()
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
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Base[]
	additionalCosts: AdditionalCosts[]
}

export const OrderAdd = ({ acquisitionType, clients, events, additionalCosts }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems } = isRent ? rentStore : buyStore
	useNavbarItems({ title: isRent ? 'Orders.addRent' : 'Orders.addBuy', backLabel: 'General.back' })

	const initialProducts = useMemo(() => {
		return selectedItems.map((product: Product) => ({
			productId: product.id,
			quantity: 0,
			price: 0
		}))
	}, [selectedItems])

	const initialAdditionalCosts = useMemo(() => {
		return additionalCosts?.map((additionalCost: AdditionalCosts) => ({
			additionalCostId: additionalCost.id,
			isIncluded: false,
			quantity: 0,
			price: 0
		}))
	}, [additionalCosts])

	const initialServices = useMemo(() => {
		const serviceMap = new Map<string, { serviceId: string; isIncluded: boolean; quantity: number; price: number }>()

		selectedItems.forEach((product: Product) => {
			if (product.servicePrices && product.servicePrices.length > 0) {
				product.servicePrices.forEach(service => {
					const serviceId = service.id || service.serviceId
					if (serviceId && !serviceMap.has(serviceId)) {
						// Check if service is default for this acquisition type
						const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

						serviceMap.set(serviceId, {
							serviceId: serviceId,
							isIncluded: isDefault || false,
							quantity: 0,
							price: 0
						})
					}
				})
			}
		})

		return Array.from(serviceMap.values())
	}, [selectedItems, isRent])

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			acquisitionType: acquisitionType,
			customerId: undefined,
			eventId: undefined,
			location: '',
			place: '',
			street: '',
			contactPerson: '',
			contactPersonContact: undefined,
			products: initialProducts,
			services: initialServices,
			additionalCosts: initialAdditionalCosts,
			totalAmount: 0,
			notes: ''
		}
	})

	useEffect(() => {
		const newProducts = selectedItems.map((product: Product) => ({
			productId: product.id,
			quantity: 0,
			price: 0
		}))
		const serviceMap = new Map<string, { serviceId: string; isIncluded: boolean; quantity: number; price: number }>()

		selectedItems.forEach((product: Product) => {
			if (product.servicePrices && product.servicePrices.length > 0) {
				product.servicePrices.forEach(service => {
					const serviceId = service.id || service.serviceId
					if (serviceId && !serviceMap.has(serviceId)) {
						// Check if service is default for this acquisition type
						const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

						serviceMap.set(serviceId, {
							serviceId: serviceId,
							isIncluded: isDefault || false,
							quantity: 0,
							price: 0
						})
					}
				})
			}
		})

		const newServices = Array.from(serviceMap.values())

		form.setValue('products', newProducts, { shouldValidate: false })
		form.setValue('services', newServices, { shouldValidate: false })
		form.setValue('totalAmount', 0, { shouldValidate: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItems])

	const products = useWatch({ control: form.control, name: 'products' }) || []
	const services = useWatch({ control: form.control, name: 'services' }) || []
	const additionalCostsData = useWatch({ control: form.control, name: 'additionalCosts' }) || []

	useEffect(() => {
		const productsTotal = products.reduce((sum, product) => sum + (product.price || 0), 0)
		const servicesTotal = services.reduce((sum, formService) => {
			// Check if service is default by finding it in selectedItems
			let isDefault = false
			selectedItems.forEach((product: Product) => {
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
		const additionalCostsTotal = additionalCostsData.reduce(
			(sum, additionalCost) => sum + (additionalCost.isIncluded ? additionalCost.price || 0 : 0),
			0
		)
		const totalAmount = productsTotal + servicesTotal + additionalCostsTotal

		form.setValue('totalAmount', totalAmount, { shouldValidate: false, shouldDirty: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [products, services, additionalCostsData, selectedItems, isRent])

	console.log('Form validation state:', {
		isValid: form.formState.isValid,
		errors: form.formState.errors,
		values: JSON.stringify(form.getValues())
	})

	const onSubmit = async () => {
		const formData = form.getValues()

		const payload: OrderPayload = {
			acquisitionType: formData.acquisitionType,
			customerId: formData.customerId,
			eventId: formData.eventId,
			location: formData.location?.trim(),
			place: formData.place.trim(),
			street: formData.street.trim(),
			contactPerson: formData.contactPerson?.trim(),
			contactPersonContact: formData.contactPersonContact?.trim(),
			products: formData.products
				.filter(p => Number(p.quantity) > 0)
				.map(p => ({
					productId: p.productId,
					quantity: Number(p.quantity) || 0,
					price: Number(p.price) || 0
				})) as OrderProduct[],
			services: (formData.services || [])
				.filter(s => {
					// Always include default services, otherwise check isIncluded
					let isDefault = false
					selectedItems.forEach((product: Product) => {
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

		const result = await createOrder(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyCreated'))
			push(ROUTES.ORDERS)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<OrderForm
							cancelDialog={cancelDialog}
							customers={clients}
							events={events}
							products={selectedItems}
							additionalCosts={additionalCosts}
							isEditMode={false}
							acquisitionType={acquisitionType}
						/>
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={form.getValues()} />
		</>
	)
}
