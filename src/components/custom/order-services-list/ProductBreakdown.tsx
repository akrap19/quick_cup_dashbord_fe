'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { OrderService } from 'api/models/order/orderService'
import { OrderProduct } from 'api/models/order/orderProduct'
import { useTranslations } from 'next-intl'
import { ProductQuantityItem } from './ProductQuantityItem'

interface ProductBreakdownProps {
	orderService: OrderService
	products: OrderProduct[]
	productsMap: Map<string, OrderProduct>
}

export const ProductBreakdown = ({ orderService, products, productsMap }: ProductBreakdownProps) => {
	const t = useTranslations()

	const hasQuantityByProduct = orderService.quantityByProduct && orderService.quantityByProduct.length > 0
	const hasProductBreakdown =
		hasQuantityByProduct ||
		(orderService.productQuantities && Object.keys(orderService.productQuantities).length > 0)

	if (!hasProductBreakdown) {
		// Proportional calculation fallback
		const productsWithQuantity = products.filter(product => product.quantity > 0)
		const totalProductQuantity = productsWithQuantity.reduce((sum, p) => sum + (p.quantity || 0), 0)

		return (
			<>
				{productsWithQuantity.map(product => {
					const productName =
						product.product?.name ||
						product.product?.productName ||
						`${t('General.product')} ${product.productId}`
					const productQuantity = product.quantity || 0
					const serviceQuantityForProduct =
						totalProductQuantity > 0
							? (orderService.quantity * productQuantity) / totalProductQuantity
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
						</Inline>
					)
				})}
			</>
		)
	}

	if (hasQuantityByProduct) {
		// Use quantityByProduct with file support
		return (
			<>
				{orderService
					.quantityByProduct!.filter(qbp => {
						const quantity = qbp.quantity ?? 0
						return quantity > 0 || !!qbp.fileId || !!qbp.fileUrl
					})
					.map(qbp => {
						const product = productsMap.get(qbp.productId)
						const productName =
							product?.product?.name || product?.product?.productName || t('General.product')
						const quantity = qbp.quantity ?? 0

						return (
							<ProductQuantityItem
								key={qbp.productId}
								productId={qbp.productId}
								productName={productName}
								quantity={quantity}
								fileId={qbp.fileId}
								fileUrl={qbp.fileUrl}
							/>
						)
					})}
			</>
		)
	}

	// Use productQuantities (simple quantity mapping)
	if (orderService.productQuantities) {
		return (
			<>
				{Object.entries(orderService.productQuantities)
					.filter(([_, serviceQuantity]) => serviceQuantity > 0)
					.map(([productId, serviceQuantity]) => {
						const product = productsMap.get(productId)
						const productName =
							product?.product?.name || product?.product?.productName || t('General.product')

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
							</Inline>
						)
					})}
			</>
		)
	}

	return null
}

