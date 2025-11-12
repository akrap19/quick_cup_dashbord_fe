'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Order } from 'api/models/order/order'
import { OrderPayload } from 'api/models/order/orderPayload'
import { updateOrder } from 'api/services/orders'
import { requiredString } from 'schemas'

import OrderForm from '../../form'

const numericString = requiredString.shape.scheme
	.refine(value => value.trim().length > 0, { message: 'ValidationMeseges.required' })
	.refine(value => !Number.isNaN(Number(value)), { message: 'ValidationMeseges.required' })
	.refine(value => Number(value) >= 0, { message: 'ValidationMeseges.required' })

const formSchema = z.object({
	orderNumber: requiredString.shape.scheme,
	customerName: requiredString.shape.scheme,
	status: requiredString.shape.scheme,
	totalAmount: numericString,
	notes: z.string().max(500).optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	order: Order
}

const OrderEdit = ({ order }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Orders.edit', backLabel: 'Orders.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			orderNumber: order?.orderNumber ?? '',
			customerName: order?.customerName ?? '',
			status: order?.status ?? '',
			totalAmount: order?.totalAmount !== undefined ? String(order.totalAmount) : '',
			notes: order?.notes ?? ''
		}
	})

	const onSubmit = async () => {
		const { orderNumber, customerName, status, totalAmount, notes } = form.getValues()
		const parsedTotalAmount = Number.parseFloat(totalAmount)

		if (Number.isNaN(parsedTotalAmount)) {
			return
		}

		const payload: OrderPayload = {
			id: order?.id,
			orderNumber: orderNumber.trim(),
			customerName: customerName.trim(),
			status: status.trim(),
			totalAmount: parsedTotalAmount,
			notes: notes?.trim() ? notes.trim() : null
		}

		const result = await updateOrder(payload)
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Orders.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<OrderForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default OrderEdit
