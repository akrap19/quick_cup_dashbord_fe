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
import { OrderPayload } from 'api/models/order/orderPayload'
import { createOrder } from 'api/services/orders'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import OrderForm from '../form'

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

interface Props {}

const OrderAdd = ({}: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Orders.add', backLabel: 'Orders.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			orderNumber: '',
			customerName: '',
			status: '',
			totalAmount: '',
			notes: ''
		}
	})

	const onSubmit = async () => {
		const { orderNumber, customerName, status, totalAmount, notes } = form.getValues()
		const parsedTotalAmount = Number.parseFloat(totalAmount)

		if (Number.isNaN(parsedTotalAmount)) {
			return
		}

		const payload: OrderPayload = {
			orderNumber: orderNumber.trim(),
			customerName: customerName.trim(),
			status: status.trim(),
			totalAmount: parsedTotalAmount,
			notes: notes?.trim() ? notes.trim() : null
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
						<OrderForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default OrderAdd
