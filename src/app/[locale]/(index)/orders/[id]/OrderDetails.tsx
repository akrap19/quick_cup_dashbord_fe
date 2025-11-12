'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Order } from 'api/models/order/order'
import { ROUTES } from 'parameters'

interface Props {
	order: Order
}

export const OrderDetails = ({ order }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: order.orderNumber,
		backLabel: 'Orders.back',
		actionButton: <EditButton buttonLabel="Orders.edit" buttonLink={ROUTES.EDIT_ORDERS + order?.id} />
	})
	const formattedTotalAmount = new Intl.NumberFormat(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(order.totalAmount)

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('Orders.orderNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.orderNumber}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Orders.customerName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.customerName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.status')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.status}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Orders.totalAmount')}</Label>
				<Text fontSize="small" color="neutral.800">
					{formattedTotalAmount}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.notes')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.notes ?? t('General.notes') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
