'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Order } from 'api/models/order/order'
import { ROUTES } from 'parameters'
import { OrderProductDetailsCard } from '@/components/custom/order-product-details-card/OrderProductDetailsCard'
import { OrderAdditionalCostsList } from '@/components/custom/order-additional-costs-list'
import { OrderServicesList } from '@/components/custom/order-services-list'
import { handleFullName } from '@/utils/handleFullName'
import { emptyToDash } from '@/utils/emptyToDash'
import { Badge } from '@/components/custom/badge'

interface Props {
	order: Order
}

export const OrderDetails = ({ order }: Props) => {
	const t = useTranslations()
	const totalAmount = order.totalAmount === 0 ? 0 : order.totalAmount?.toFixed(3)
	const totalAmountLabel = t('Orders.totalAmount') + ': ' + totalAmount + '€'
	useNavbarItems({
		title: order.orderNumber,
		backLabel: 'Orders.back',
		actionButton: <EditButton buttonLabel="Orders.edit" buttonLink={ROUTES.EDIT_ORDERS + order?.id} />
	})

	return (
		<DetailsWrapper>
			{order.products && order.products.length > 0 && (
				<>
					<Box style={{ gridColumn: 'span 2' }} paddingBottom={2}>
						<Text fontSize="big" color="neutral.900" fontWeight="semibold">
							{t('General.products')}
						</Text>
					</Box>
					{order.products.map(orderProduct => (
						<Box key={orderProduct.id || orderProduct.productId}>
							<OrderProductDetailsCard orderProduct={orderProduct} />
						</Box>
					))}
				</>
			)}
			<Stack gap={0} style={{ gridColumn: 'span 2' }}>
				<Box style={{ gridColumn: 'span 2' }}>
					<Divider />
				</Box>
				{order.services && order.services.length > 0 && (
					<>
						<Box paddingTop={4} paddingBottom={2}>
							<Text fontSize="big" color="neutral.900" fontWeight="semibold">
								{t('General.services')}
							</Text>
						</Box>
						<OrderServicesList services={order.services} products={order.products} />
					</>
				)}
				{order.additionalCosts && order.additionalCosts.length > 0 && (
					<>
						<Box paddingTop={4} paddingBottom={2}>
							<Text fontSize="big" color="neutral.900" fontWeight="semibold">
								{t('General.additionalCosts')}
							</Text>
						</Box>
						<OrderAdditionalCostsList additionalCosts={order.additionalCosts} />
					</>
				)}
			</Stack>
			<Stack gap={4}>
				<Label>{t('Orders.orderNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{order.orderNumber}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.status')}</Label>
				<Badge variant={order?.status?.toLowerCase() as any} />
			</Stack>
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
			<Box style={{ gridColumn: 'span 2' }}>
				<Divider />
			</Box>
			<Text fontSize="xbig" color="neutral.900" fontWeight="semibold">
				{totalAmountLabel}
			</Text>
		</DetailsWrapper>
	)
}
