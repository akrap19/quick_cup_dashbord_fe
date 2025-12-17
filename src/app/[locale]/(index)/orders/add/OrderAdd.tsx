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
import { optionalPhoneNumberScheme, requiredString } from 'schemas'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import { OrderForm } from '../form'
import { Base } from 'api/models/common/base'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { Product } from 'api/models/products/product'

const orderProductSchema = z.object({
	productId: requiredString.shape.scheme,
	quantity: z.coerce.number().min(1),
	price: z.coerce.number().min(0)
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
		.array(z.object({ serviceId: z.string(), quantity: z.number(), price: z.number() }))
		.optional()
		.default([]),
	totalAmount: z.coerce.number().min(0),
	notes: z.string().max(500).optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Base[]
}

export const OrderAdd = ({ acquisitionType, clients, events }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems } = isRent ? rentStore : buyStore
	useNavbarItems({ title: 'Orders.add', backLabel: 'Orders.back' })

	const initialProducts = useMemo(() => {
		return selectedItems.map((product: Product) => ({
			productId: product.id,
			quantity: 0,
			price: 0
		}))
	}, [selectedItems])

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
			contactPersonContact: '',
			products: initialProducts,
			services: [],
			totalAmount: 1000,
			notes: ''
		}
	})

	useEffect(() => {
		const newProducts = selectedItems.map((product: Product) => ({
			productId: product.id,
			quantity: 0,
			price: 0
		}))
		form.setValue('products', newProducts, { shouldValidate: false })
		form.setValue('totalAmount', 0, { shouldValidate: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItems])

	const products = useWatch({ control: form.control, name: 'products' }) || []
	const services = useWatch({ control: form.control, name: 'services' }) || []

	useEffect(() => {
		const productsTotal = products.reduce((sum, product) => sum + (product.price || 0), 0)
		const servicesTotal = services.reduce((sum, service) => sum + (service.price || 0) * (service.quantity || 0), 0)
		const totalAmount = productsTotal + servicesTotal

		form.setValue('totalAmount', totalAmount, { shouldValidate: false, shouldDirty: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [products, services])

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
			products: formData.products.map(p => ({
				productId: p.productId,
				quantity: p.quantity,
				price: p.price
			})) as OrderProduct[],
			services: formData.services || [],
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
						<OrderForm cancelDialog={cancelDialog} customers={clients} events={events} products={selectedItems} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={form.getValues()} />
		</>
	)
}
