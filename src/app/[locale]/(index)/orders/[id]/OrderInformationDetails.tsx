'use client'

import { useTranslations } from 'next-intl'

import { TabsWrapper } from '@/components/custom/layouts/TabsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Order } from 'api/models/order/order'
import { handleFullName } from '@/utils/handleFullName'
import { emptyToDash } from '@/utils/emptyToDash'

interface Props {
	order: Order
}

export const OrderInformationDetails = ({ order }: Props) => {
	const t = useTranslations()

	return (
		<TabsWrapper>
			<Stack gap={4}>
				<Label>{t('General.client')}</Label>
				<Text fontSize="small" color="neutral.800">
					{handleFullName(order.customer.firstName, order.customer.lastName)}
				</Text>
			</Stack>
			<div />
			<Stack gap={4}>
				<Label>{t('General.event')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.event?.title ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.location')}</Label>
				<Text fontSize="small" color="neutral.800">
					{emptyToDash(order.location) ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.placeAndPostalCode')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.place ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.streetAndNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.street ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Orders.contactPerson')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.contactPerson || '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Orders.contactPersonContact')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.contactPersonContact ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.notes')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.notes ?? '-'}
				</Text>
			</Stack>

			<Stack gap={4}>
				<Label>{t('Orders.discount')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.discount !== undefined && order.discount !== null ? `${order.discount}%` : '-'}
				</Text>
			</Stack>
		</TabsWrapper>
	)
}
