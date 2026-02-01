'use client'

import { useTranslations } from 'next-intl'
import { ItemCarousel } from '@/components/custom/item-carousel/ItemCarousel'
import Image from 'next/image'
import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { OrderProduct } from 'api/models/order/orderProduct'
import { OrderProductCardContainer } from '@/components/custom/order-product-card-container'

interface OrderProductDetailsCardProps {
	orderProduct: OrderProduct
}

export const OrderProductDetailsCard = ({ orderProduct }: OrderProductDetailsCardProps) => {
	const t = useTranslations()
	const product = orderProduct.product

	if (!product) {
		return null
	}

	const imageSection =
		product.images && product.images.length > 0 ? (
			<ItemCarousel>
				{product.images.map((item: any, index: number) => {
					const imageUrl = typeof item === 'string' ? item : item?.url || item
					return (
						<Image
							key={imageUrl || index}
							alt={product.name || 'Product image'}
							src={imageUrl ?? ''}
							width={121}
							height={150}
							style={{ objectFit: 'contain' }}
							priority
						/>
					)
				})}
			</ItemCarousel>
		) : (
			<Box
				width="100%"
				height="100%"
				display="flex"
				alignItems="center"
				justifyContent="center"
				backgroundColor="neutral.100"
				borderRadius="small">
				<Text color="neutral.500" fontSize="small">
					{t('General.images')}
				</Text>
			</Box>
		)

	const productInfoSection = (
		<Stack justifyContent="space-between" style={{ height: '100%' }}>
			<Text fontSize="big" color="neutral.900" fontWeight="semibold">
				{product.name}
			</Text>
			<Stack gap={1}>
				<Text color="neutral.700">
					{t('General.quantity')}: {orderProduct.quantity}
				</Text>
			</Stack>
		</Stack>
	)

	const rightSection = null

	return (
		<OrderProductCardContainer
			imageSection={imageSection}
			productInfoSection={productInfoSection}
			rightSection={rightSection}
		/>
	)
}
