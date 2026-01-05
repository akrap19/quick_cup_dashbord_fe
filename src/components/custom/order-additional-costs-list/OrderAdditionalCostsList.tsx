'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { OrderAdditionalCost } from 'api/models/order/orderAdditionalCost'
import { OrderProduct } from 'api/models/order/orderProduct'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

interface OrderAdditionalCostsListProps {
	additionalCosts: OrderAdditionalCost[]
	products?: OrderProduct[]
}

export const OrderAdditionalCostsList = ({ additionalCosts, products = [] }: OrderAdditionalCostsListProps) => {
	const t = useTranslations()

	// Create a map of products by productId for quick lookup
	const productsMap = useMemo(() => {
		const map = new Map<string, OrderProduct>()
		products.forEach(product => {
			if (product.productId) {
				map.set(product.productId, product)
			}
		})
		return map
	}, [products])

	return (
		<Box style={{ gridColumn: 'span 2' }}>
			<Stack gap={0}>
				{additionalCosts.map((orderAdditionalCost, index) => {
					// Check if we have quantityByProduct
					const hasQuantityByProduct =
						orderAdditionalCost.quantityByProduct && orderAdditionalCost.quantityByProduct.length > 0

					// Calculate total quantity
					let totalQuantity = orderAdditionalCost.quantity || 0
					if (hasQuantityByProduct) {
						totalQuantity = orderAdditionalCost.quantityByProduct!.reduce((sum, qbp) => sum + (qbp.quantity || 0), 0)
					}

					// Show product breakdown if we have quantityByProduct and products
					const shouldShowBreakdown = hasQuantityByProduct && products && products.length > 0

					return (
						<Box
							key={orderAdditionalCost.id}
							paddingY={3}
							paddingX={0}
							style={index !== additionalCosts.length - 1 ? { borderBottom: '1px solid #E5E7EB' } : undefined}>
							<Stack gap={2}>
								<Inline justifyContent="space-between" alignItems="center" gap={3}>
									<Box display="flex" style={{ flex: 1 }}>
										<Stack gap={1}>
											<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
												{orderAdditionalCost.additionalCost?.name || ''}
											</Text>
											{totalQuantity > 0 && !shouldShowBreakdown && (
												<Text color="neutral.700" fontSize="small">
													{t('General.quantity')}: {totalQuantity}
												</Text>
											)}
										</Stack>
									</Box>
									<Box display="flex" alignItems="flex-start" paddingTop={1}>
										<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
											{orderAdditionalCost.price.toFixed(3)}€
										</Text>
									</Box>
								</Inline>

								{/* Show product breakdown if we have quantityByProduct */}
								{shouldShowBreakdown && (
									<Box paddingLeft={2}>
										<Stack gap={2}>
											{orderAdditionalCost
												.quantityByProduct!.filter(qbp => qbp.quantity > 0)
												.map(qbp => {
													const product = productsMap.get(qbp.productId)
													const productName =
														product?.product?.name || product?.product?.productName || t('General.product')

													// Calculate price per product proportionally
													const productPrice =
														totalQuantity > 0 ? (orderAdditionalCost.price * qbp.quantity) / totalQuantity : 0

													return (
														<Inline key={qbp.productId} justifyContent="space-between" alignItems="center" gap={3}>
															<Box display="flex" style={{ flex: 1 }}>
																<Stack gap={1}>
																	<Text color="neutral.700" fontSize="small" fontWeight="semibold">
																		{productName}
																	</Text>
																	<Text color="neutral.600" fontSize="small">
																		{t('General.quantity')}: {Math.round(qbp.quantity)}
																	</Text>
																</Stack>
															</Box>
															<Box display="flex" alignItems="flex-start">
																<Text color="neutral.700" fontSize="small" fontWeight="semibold">
																	{productPrice.toFixed(3)}€
																</Text>
															</Box>
														</Inline>
													)
												})}
										</Stack>
									</Box>
								)}
							</Stack>
						</Box>
					)
				})}
			</Stack>
		</Box>
	)
}
