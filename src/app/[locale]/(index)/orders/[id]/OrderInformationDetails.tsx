'use client'

import { useTranslations } from 'next-intl'

import { TabsWrapper } from '@/components/custom/layouts/TabsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
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
			<Stack gap={4}>
				<Label>{t('General.event')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.event?.title}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.location')}</Label>
				<Text fontSize="small" color="neutral.800">
					{emptyToDash(order.location)}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.placeAndPostalCode')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.place ?? t('General.placeAndPostalCode') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.streetAndNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.street ?? t('General.streetAndNumber') + t('General.notDefined')}
				</Text>
			</Stack>
			<div />
			<Stack gap={4}>
				<Label>{t('Orders.contactPerson')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.contactPerson ?? t('Orders.contactPerson') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Orders.contactPersonContact')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.contactPersonContact ?? t('Orders.contactPersonContact') + t('General.notDefined')}
				</Text>
			</Stack>
			<Box style={{ gridColumn: 'span 2' }}>
				<Stack gap={4}>
					<Label>{t('General.notes')}</Label>
					<Text fontSize="small" color="neutral.800">
						{order.notes ?? t('General.notes') + t('General.notDefined')}
					</Text>
				</Stack>
			</Box>
		</TabsWrapper>
	)
}
