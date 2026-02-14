'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { OrderService } from 'api/models/order/orderService'
import { OrderProduct } from 'api/models/order/orderProduct'
import { useTranslations } from 'next-intl'
import { ProductBreakdown } from './ProductBreakdown'
import { PriceCalculationUnit } from 'enums/priceCalculationUnit'

interface ServiceItemProps {
	orderService: OrderService
	products: OrderProduct[]
	productsMap: Map<string, OrderProduct>
	isLast: boolean
}

export const ServiceItem = ({ orderService, products, productsMap, isLast }: ServiceItemProps) => {
	const t = useTranslations()

	const hasQuantityByProduct = orderService.quantityByProduct && orderService.quantityByProduct.length > 0

	let totalQuantity = orderService.quantity
	if (hasQuantityByProduct) {
		totalQuantity = orderService.quantityByProduct!.reduce((sum, qbp) => sum + (qbp.quantity || 0), 0)
	} else if (orderService.productQuantities && Object.keys(orderService.productQuantities).length > 0) {
		totalQuantity = Object.values(orderService.productQuantities).reduce((sum, qty) => sum + qty, 0)
	}

	const shouldShowBreakdown =
		orderService?.service && orderService.service.priceCalculationUnit !== PriceCalculationUnit.TRANSPORTATION_UNIT

	return (
		<Box paddingY={3} paddingX={0} style={!isLast ? { borderBottom: '1px solid #E5E7EB' } : undefined}>
			<Stack gap={2}>
				<Inline justifyContent="space-between" alignItems="center" gap={3}>
					<Box display="flex" style={{ flex: 1 }}>
						<Stack gap={1}>
							<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
								{orderService.service?.name || orderService.service?.serviceName || t('General.service')}
							</Text>
							{totalQuantity > 0 && !shouldShowBreakdown && (
								<Text color="neutral.700" fontSize="small">
									{t('General.quantity')}: {totalQuantity}
								</Text>
							)}
						</Stack>
					</Box>
				</Inline>

				{shouldShowBreakdown && (
					<Box paddingLeft={2}>
						<Stack gap={2}>
							<ProductBreakdown orderService={orderService} products={products} productsMap={productsMap} />
						</Stack>
					</Box>
				)}
			</Stack>
		</Box>
	)
}
