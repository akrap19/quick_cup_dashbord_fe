'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useTableStore } from '@/store/table'
import { Order } from 'api/models/order/order'
import { updateOrderStatus } from 'api/services/orders'
import { OrderStatusEnum } from 'enums/orderStatusEnum'

interface Props {
	selectedItem: Order
}

export const OrderStatusButtons = ({ selectedItem }: Props) => {
	const t = useTranslations()
	const { clearCheckedItems } = useTableStore()
	const { refresh } = useRouter()

	if (!selectedItem) {
		return null
	}

	const handleStatusUpdate = async (newStatus: OrderStatusEnum) => {
		if (!selectedItem?.id) {
			return
		}

		const result = await updateOrderStatus(newStatus, selectedItem.id)

		if (result?.message === 'OK' || result) {
			SuccessToast(t('Orders.statusUpdated'))
			clearCheckedItems()
			refresh()
		}
	}

	const currentStatus = selectedItem.status as OrderStatusEnum
	const buttons: JSX.Element[] = []

	switch (currentStatus) {
		case OrderStatusEnum.PENDING:
			buttons.push(
				<Button key="accepted" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.ACCEPTED)}>
					{t('Orders.statusAccepted')}
				</Button>,
				<Button key="declined" variant="destructive" onClick={() => handleStatusUpdate(OrderStatusEnum.DECLINED)}>
					{t('Orders.statusDeclined')}
				</Button>
			)
			break
		case OrderStatusEnum.ACCEPTED:
			buttons.push(
				<Button
					key="payment-pending"
					variant="primary"
					onClick={() => handleStatusUpdate(OrderStatusEnum.PAYMENT_PENDING)}>
					{t('Orders.statusPaymentPending')}
				</Button>
			)
			break
		case OrderStatusEnum.PAYMENT_PENDING:
			buttons.push(
				<Button
					key="payment-received"
					variant="success"
					onClick={() => handleStatusUpdate(OrderStatusEnum.PAYMENT_RECEIVED)}>
					{t('Orders.statusPaymentReceived')}
				</Button>
			)
			break
		case OrderStatusEnum.PAYMENT_RECEIVED:
			buttons.push(
				<Button key="in-production" variant="primary" onClick={() => handleStatusUpdate(OrderStatusEnum.IN_PRODUCTION)}>
					{t('Orders.statusInProduction')}
				</Button>
			)
			break
		case OrderStatusEnum.IN_PRODUCTION:
			buttons.push(
				<Button key="ready" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.READY)}>
					{t('Orders.statusReady')}
				</Button>
			)
			break
		case OrderStatusEnum.READY:
			buttons.push(
				<Button key="in-transit" variant="primary" onClick={() => handleStatusUpdate(OrderStatusEnum.IN_TRANSIT)}>
					{t('Orders.statusInTransit')}
				</Button>
			)
			break
		case OrderStatusEnum.IN_TRANSIT:
			buttons.push(
				<Button key="completed" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.COMPLETED)}>
					{t('Orders.statusCompleted')}
				</Button>
			)
			break
		default:
			return null
	}

	return buttons.length > 0 ? (
		<Inline gap={4} alignItems="center">
			{buttons}
		</Inline>
	) : null
}
