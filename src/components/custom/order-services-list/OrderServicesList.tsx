'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { OrderService } from 'api/models/order/orderService'
import { OrderProduct } from 'api/models/order/orderProduct'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

interface OrderServicesListProps {
	services: OrderService[]
	products?: OrderProduct[]
}

export const OrderServicesList = ({ services, products = [] }: OrderServicesListProps) => {
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

	// For each service, show all products in the order
	// Services apply to all products in the order
	const serviceToProductsMap = useMemo(() => {
		const map = new Map<string, OrderProduct[]>()
		services.forEach(service => {
			const serviceId = service.serviceId
			// Always use all products for each service
			map.set(serviceId, products)
		})
		return map
	}, [services, products])

	return (
		<Box style={{ gridColumn: 'span 2' }}>
			<Stack gap={0}>
				{services.map((orderService, index) => {
					const serviceId = orderService.serviceId

					// Find products that have this service
					const productsWithService = serviceToProductsMap.get(serviceId) || []

					// Check if we have quantityByProduct from API
					const hasQuantityByProduct = orderService.quantityByProduct && orderService.quantityByProduct.length > 0
					
					// Calculate price per product if we have quantityByProduct or productQuantities
					const hasProductBreakdown =
						hasQuantityByProduct ||
						(orderService.productQuantities && Object.keys(orderService.productQuantities).length > 0)
					
					let totalQuantity = orderService.quantity
					if (hasQuantityByProduct) {
						totalQuantity = orderService.quantityByProduct!.reduce((sum, qbp) => sum + (qbp.quantity || 0), 0)
					} else if (orderService.productQuantities && Object.keys(orderService.productQuantities).length > 0) {
						totalQuantity = Object.values(orderService.productQuantities).reduce((sum, qty) => sum + qty, 0)
					}

					// Always show product breakdown if we have products (even if some have 0 quantity)
					const shouldShowBreakdown = products && products.length > 0

					return (
						<Box
							key={orderService.serviceId || index}
							paddingY={3}
							paddingX={0}
							style={index !== services.length - 1 ? { borderBottom: '1px solid #E5E7EB' } : undefined}>
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
									<Box display="flex" alignItems="flex-start" paddingTop={1}>
										<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
											{orderService.price.toFixed(3)}€
										</Text>
									</Box>
								</Inline>

								{/* Show product breakdown if we have products */}
								{shouldShowBreakdown && (
									<Box paddingLeft={2}>
										<Stack gap={2}>
											{hasProductBreakdown && hasQuantityByProduct
												? orderService.quantityByProduct!
														.filter(qbp => qbp.quantity > 0)
														.map(qbp => {
															const product = productsMap.get(qbp.productId)
															const productName =
																product?.product?.name || product?.product?.productName || t('General.product')

															// Calculate price per product proportionally
															const productPrice =
																totalQuantity > 0 ? (orderService.price * qbp.quantity) / totalQuantity : 0

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
														})
												: hasProductBreakdown && orderService.productQuantities
													? Object.entries(orderService.productQuantities)
															.filter(([_, serviceQuantity]) => serviceQuantity > 0)
															.map(([productId, serviceQuantity]) => {
																const product = productsMap.get(productId)
																const productName =
																	product?.product?.name || product?.product?.productName || t('General.product')

																// Calculate price per product proportionally
																const productPrice =
																	totalQuantity > 0 ? (orderService.price * serviceQuantity) / totalQuantity : 0

																return (
																	<Inline key={productId} justifyContent="space-between" alignItems="center" gap={3}>
																		<Box display="flex" style={{ flex: 1 }}>
																			<Stack gap={1}>
																				<Text color="neutral.700" fontSize="small" fontWeight="semibold">
																					{productName}
																				</Text>
																				<Text color="neutral.600" fontSize="small">
																					{t('General.quantity')}: {Math.round(serviceQuantity)}
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
															})
												: productsWithService
														.filter(product => product.quantity > 0)
														.map(product => {
															const productName =
																product.product?.name ||
																product.product?.productName ||
																`${t('General.product')} ${product.productId}`
															const productQuantity = product.quantity || 0

															// Calculate total product quantity for proportional calculation
															const totalProductQuantity = productsWithService.reduce(
																(sum, p) => sum + (p.quantity || 0),
																0
															)

															// Calculate service quantity for this product proportionally
															const serviceQuantityForProduct =
																totalProductQuantity > 0
																	? (orderService.quantity * productQuantity) / totalProductQuantity
																	: 0

															// Calculate price per product proportionally based on quantity
															const productPrice =
																totalProductQuantity > 0
																	? (orderService.price * productQuantity) / totalProductQuantity
																	: 0

															return (
																<Inline
																	key={product.productId || product.id}
																	justifyContent="space-between"
																	alignItems="center"
																	gap={3}>
																	<Box display="flex" style={{ flex: 1 }}>
																		<Stack gap={1}>
																			<Text color="neutral.700" fontSize="small" fontWeight="semibold">
																				{productName}
																			</Text>
																			<Text color="neutral.600" fontSize="small">
																				{t('General.quantity')}: {Math.round(serviceQuantityForProduct)}
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
