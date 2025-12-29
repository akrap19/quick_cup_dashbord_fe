'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { TabsWrapper } from '@/components/custom/layouts/TabsWrapper'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Order } from 'api/models/order/order'
import { ROUTES } from 'parameters'
import { OrderProductDetailsCard } from '@/components/custom/order-product-details-card/OrderProductDetailsCard'
import { OrderAdditionalCostsList } from '@/components/custom/order-additional-costs-list'
import { OrderServicesList } from '@/components/custom/order-services-list'
import { Tabs } from '@/components/navigation/tabs'
import { OrderDetailsFooter } from './OrderDetailsFooter'
import { OrderInformationDetails } from './OrderInformationDetails'

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
		<>
			<Tabs size="large">
				<Tabs.Tab value="products" defaultTab>
					{t('General.products')}
				</Tabs.Tab>
				<Tabs.Tab value="services">{t('General.services')}</Tabs.Tab>
				<Tabs.Tab value="additionalCosts">{t('General.additionalCosts')}</Tabs.Tab>
				<Tabs.Tab value="orderInformation">{t('Orders.step4Title')}</Tabs.Tab>

				<Tabs.Panel value="products">
					<TabsWrapper>
						{order.products && order.products.length > 0 ? (
							order.products.map(orderProduct => (
								<Box key={orderProduct.id || orderProduct.productId}>
									<OrderProductDetailsCard orderProduct={orderProduct} />
								</Box>
							))
						) : (
							<Box style={{ gridColumn: 'span 2' }}>
								<Text fontSize="small" color="neutral.600">
									{t('General.noData') || 'No products found'}
								</Text>
							</Box>
						)}
					</TabsWrapper>
				</Tabs.Panel>

				<Tabs.Panel value="services">
					<TabsWrapper>
						{order.services && order.services.length > 0 ? (
							<Box style={{ gridColumn: 'span 2' }}>
								<OrderServicesList services={order.services} products={order.products} />
							</Box>
						) : (
							<Box style={{ gridColumn: 'span 2' }}>
								<Text fontSize="small" color="neutral.600">
									{t('General.noData') || 'No services found'}
								</Text>
							</Box>
						)}
					</TabsWrapper>
				</Tabs.Panel>

				<Tabs.Panel value="additionalCosts">
					<TabsWrapper>
						{order.additionalCosts && order.additionalCosts.length > 0 ? (
							<Box style={{ gridColumn: 'span 2' }}>
								<OrderAdditionalCostsList additionalCosts={order.additionalCosts} />
							</Box>
						) : (
							<Box style={{ gridColumn: 'span 2' }}>
								<Text fontSize="small" color="neutral.600">
									{t('General.noData') || 'No additional costs found'}
								</Text>
							</Box>
						)}
					</TabsWrapper>
				</Tabs.Panel>

				<Tabs.Panel value="orderInformation">
					<OrderInformationDetails order={order} />
				</Tabs.Panel>
			</Tabs>
			<OrderDetailsFooter totalAmountLabel={totalAmountLabel} status={order?.status || ''} />
		</>
	)
}
