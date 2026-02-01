'use client'

import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import { EditButton } from '@/components/custom/button/edit-button'
import { TabsWrapper } from '@/components/custom/layouts/TabsWrapper'
import { Heading } from '@/components/typography/heading'
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
import { useNavbarItemsStore } from '@/store/navbar'
import { Loader } from '@/components/custom/loader/Loader'
import { NoResult } from '@/components/custom/no-result/NoResult'

interface Props {
	order: Order
}

export const OrderDetails = ({ order }: Props) => {
	const t = useTranslations()
	const { data: session } = useSession()
	const { navbarIsLoading } = useNavbarItemsStore()
	useNavbarItems({
		title: order.orderNumber,
		backLabel: 'Orders.back',
		actionButton: <EditButton buttonLabel="Orders.edit" buttonLink={ROUTES.EDIT_ORDERS + order?.id} />
	})

	const currentUserId = session?.user?.userId

	// Group products by ownership
	const productsToRent =
		order.products?.filter(orderProduct => !orderProduct.product?.ownedBy || orderProduct.product.ownedBy === '') || []
	const ownedProducts =
		order.products?.filter(orderProduct => orderProduct.product?.ownedBy && orderProduct.product.ownedBy !== '') || []

	// Determine ownership label for owned products section
	const hasOwnedByCurrentUser = ownedProducts.some(orderProduct => orderProduct.product?.ownedBy === currentUserId)
	const ownershipSectionTitle = hasOwnedByCurrentUser ? t('Rent.myProducts') : t('Rent.usersProducts')

	return navbarIsLoading ? (
		<Box style={{ width: 'calc(100vw - 400px)' }}>
			<Loader />
		</Box>
	) : (
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
						{/* Products to be rented section */}
						{productsToRent.length > 0 && (
							<>
								{productsToRent.map(orderProduct => (
									<Box key={orderProduct.id || orderProduct.productId}>
										<OrderProductDetailsCard orderProduct={orderProduct} />
									</Box>
								))}
							</>
						)}

						{/* Owned products section */}
						{ownedProducts.length > 0 && (
							<>
								<Box style={{ gridColumn: 'span 2' }}>
									<Heading variant="h4" color="neutral.900">
										{ownershipSectionTitle}
									</Heading>
								</Box>
								{ownedProducts.map(orderProduct => (
									<Box key={orderProduct.id || orderProduct.productId}>
										<OrderProductDetailsCard orderProduct={orderProduct} />
									</Box>
								))}
							</>
						)}

						{/* No products message */}
						{productsToRent.length === 0 && ownedProducts.length === 0 && (
							<Box style={{ gridColumn: 'span 2' }}>
								<NoResult size="large" noResoultMessage="General.nothingChosen" />
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
								<NoResult size="large" noResoultMessage="General.nothingChosen" />
							</Box>
						)}
					</TabsWrapper>
				</Tabs.Panel>

				<Tabs.Panel value="additionalCosts">
					<TabsWrapper>
						{order.additionalCosts && order.additionalCosts.length > 0 ? (
							<Box style={{ gridColumn: 'span 2' }}>
								<OrderAdditionalCostsList additionalCosts={order.additionalCosts} products={order.products} />
							</Box>
						) : (
							<Box style={{ gridColumn: 'span 2' }}>
								<NoResult size="large" noResoultMessage="General.nothingChosen" />
							</Box>
						)}
					</TabsWrapper>
				</Tabs.Panel>

				<Tabs.Panel value="orderInformation">
					<OrderInformationDetails order={order} />
				</Tabs.Panel>
			</Tabs>
			<OrderDetailsFooter status={order?.status || ''} />
		</>
	)
}
