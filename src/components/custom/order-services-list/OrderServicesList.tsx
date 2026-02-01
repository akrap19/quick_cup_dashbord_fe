'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { OrderService } from 'api/models/order/orderService'
import { OrderProduct } from 'api/models/order/orderProduct'
import { useMemo } from 'react'
import { ServiceItem } from './ServiceItem'

interface OrderServicesListProps {
	services: OrderService[]
	products?: OrderProduct[]
}

export const OrderServicesList = ({ services, products = [] }: OrderServicesListProps) => {
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
				{services.map((orderService, index) => (
					<ServiceItem
						key={orderService.serviceId || index}
						orderService={orderService}
						products={products}
						productsMap={productsMap}
						isLast={index === services.length - 1}
					/>
				))}
			</Stack>
		</Box>
	)
}
