'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { ItemCarousel } from '@/components/custom/item-carousel/ItemCarousel'
import Image from 'next/image'
import { Button } from '@/components/inputs/button'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { Product } from 'api/models/products/product'
import { useWatch } from 'react-hook-form'
import { FormControl } from '@/components/inputs/form-control'
import { NumericInput } from '@/components/inputs/numeric-input'
import { ProductPrice } from 'api/models/products/productPrice'
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
	const quantityFieldName = `products.${index}.quantity`
	const productIdFieldName = `products.${index}.productId`
	const priceFieldName = `products.${index}.price`

	const quantity = useWatch({ control: form.control, name: quantityFieldName }) || 0
	const currentPrice = useWatch({ control: form.control, name: priceFieldName }) || 0
	const products = useWatch({ control: form.control, name: 'products' }) || []
	const previousQuantityRef = useRef<number>(quantity)
	const isOnlyOneProduct = products.length <= 1

	useEffect(() => {
		const currentProductId = form.getValues(productIdFieldName)
		if (!currentProductId) {
			form.setValue(productIdFieldName, product.id, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (previousQuantityRef.current === quantity) {
			return
		}
		previousQuantityRef.current = quantity

		if (quantity > 0) {
			const singleProductPrice =
				product.prices.find((price: ProductPrice) => {
					const minQty = price?.minQuantity ?? 0
					const maxQty = price?.maxQuantity ?? Infinity
					return quantity >= minQty && quantity <= maxQty
				})?.price ?? 0

			const calculatedPrice = Number.parseFloat((singleProductPrice * quantity).toFixed(3))
			const currentPriceValue = form.getValues(priceFieldName)

			// Only update if the price actually changed
			if (currentPriceValue !== calculatedPrice) {
				form.setValue(priceFieldName, calculatedPrice, { shouldValidate: false, shouldDirty: false })
			}
		} else {
			const currentPriceValue = form.getValues(priceFieldName)
			if (currentPriceValue !== 0) {
				form.setValue(priceFieldName, 0, { shouldValidate: false, shouldDirty: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantity])

	const totalPrice = currentPrice

	const handleRemoveProduct = (productId: string) => {
		const currentProducts = form.getValues('products') || []
		const updatedProducts = currentProducts.filter((_: any, idx: number) => idx !== index)
		form.setValue('products', updatedProducts)

		// Remove from store based on acquisition type
		const acquisitionType = form.getValues('acquisitionType')
		const isRent = acquisitionType === AcquisitionTypeEnum.RENT
		const store = isRent ? rentStore : buyStore
		store.removeItem(productId)
	}

	const imageSection = (
		<ItemCarousel>
			{/* @ts-ignore */}
			{product?.images?.map((item: string) => (
				<Image
					key={item}
					alt={item}
					src={item ?? ''}
					width={121}
					height={150}
					style={{ objectFit: 'contain' }}
					priority
				/>
			))}
		</ItemCarousel>
	)

	const productInfoSection = (
		<>
			<Text fontSize="big" color="neutral.900" fontWeight="semibold">
				{product.name + ' ' + product.size}
			</Text>
			<Box flex="1" position="absolute" style={{ bottom: 0, left: 0, width: '140px' }}>
				<Text color="neutral.700">{t('General.quantity')}</Text>
				<FormControl name={quantityFieldName as any}>
					<NumericInput placeholder={t('General.quantityPlaceholder')} allowNegative={false} decimalScale={0} />
				</FormControl>
			</Box>
		</>
	)

	const rightSection = (
		<Stack alignItems="flex-end" justifyContent="space-between" style={{ height: '150px' }}>
			<Button
				type="button"
				variant="destructive"
				size="icon"
				onClick={() => handleRemoveProduct(product.id)}
				disabled={isOnlyOneProduct}>
				<TrashIcon size="small" color="shades.00" />
			</Button>
			<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
				{totalPrice}€
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
