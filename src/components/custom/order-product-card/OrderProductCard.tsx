'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { ItemCarousel } from '@/components/custom/item-carousel/ItemCarousel'
import Image from 'next/image'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { Product } from 'api/models/products/product'
import { useWatch } from 'react-hook-form'
import { FormControl } from '@/components/inputs/form-control'
import { NumericInput } from '@/components/inputs/numeric-input'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { OrderProductCardContainer } from '@/components/custom/order-product-card-container'

interface OrderProductCardProps {
	product: Product
	index: number
}

export const OrderProductCard = ({ product, index }: OrderProductCardProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const acquisitionType = form.getValues('acquisitionType')
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const store = isRent ? rentStore : buyStore
	const isProductInStore = store.selectedItems.some(item => item.id === product.id)
	const quantityFieldName = index >= 0 ? `products.${index}.quantity` : ''
	const productIdFieldName = index >= 0 ? `products.${index}.productId` : ''
	const priceFieldName = index >= 0 ? `products.${index}.price` : ''
	const priceValue = useWatch({ control: form.control, name: priceFieldName as any })
	const currentPrice = index >= 0 ? priceValue || 0 : 0

	useEffect(() => {
		if (index >= 0 && productIdFieldName) {
			const currentProductId = form.getValues(productIdFieldName as any)
			if (!currentProductId) {
				form.setValue(productIdFieldName as any, product.id, { shouldValidate: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index])

	const totalPrice = currentPrice

	const handleToggleProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isProductInStore) {
			store.removeItem(product.id)

			form.setValue(productIdFieldName as any, undefined, { shouldValidate: false })
			form.setValue(quantityFieldName as any, '', { shouldValidate: false })
			form.setValue(priceFieldName as any, 0, { shouldValidate: false })
		} else {
			store.addItem(product)
		}
	}

	const imageSection = (
		<ItemCarousel>
			{(product?.images && product.images.length > 0
				? product.images
				: [{ url: '/images/no_image_placeholder.png' }]
			).map((item: any, index: number) => {
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
	)

	const productInfoSection = (
		<>
			<Text fontSize="big" color="neutral.900" fontWeight="semibold">
				{product.name}
			</Text>

			<Box flex="1" position="absolute" style={{ bottom: 0, left: 0, width: '140px' }}>
				<Text color="neutral.700">{t('General.quantity')}</Text>
				<FormControl name={quantityFieldName as any}>
					<NumericInput
						placeholder={t('General.quantityPlaceholder')}
						allowNegative={false}
						decimalScale={3}
						disabled={!isProductInStore}
					/>
				</FormControl>
			</Box>
		</>
	)

	const rightSection = (
		<Stack alignItems="flex-end" justifyContent="space-between" style={{ height: '150px' }}>
			<Button
				variant={isProductInStore ? 'destructive' : 'success'}
				size="icon"
				onClick={handleToggleProduct}
				type="button">
				{isProductInStore ? (
					<MinusIcon size="small" color="shades.00" />
				) : (
					<PlainPlusIcon size="small" color="shades.00" />
				)}
			</Button>
			<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
				{totalPrice?.toFixed(3)}€
			</Text>
		</Stack>
	)

	return (
		<OrderProductCardContainer
			key={product.id}
			imageSection={imageSection}
			productInfoSection={productInfoSection}
			rightSection={rightSection}
		/>
	)
}
