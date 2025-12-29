'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import { useEffect, useRef } from 'react'
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

	// Get acquisition type to determine which store to use
	const acquisitionType = form.getValues('acquisitionType')
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const store = isRent ? rentStore : buyStore
	const isProductInStore = store.selectedItems.some(item => item.id === product.id)

	// Only create field names if product is in form (index >= 0)
	const quantityFieldName = index >= 0 ? `products.${index}.quantity` : 'products.0.quantity'
	const productIdFieldName = index >= 0 ? `products.${index}.productId` : 'products.0.productId'
	const priceFieldName = index >= 0 ? `products.${index}.price` : 'products.0.price'

	// Always call useWatch hooks (they must be called unconditionally)
	// Use a safe default field name when index < 0 to avoid hook order issues
	const quantityValue = useWatch({ control: form.control, name: quantityFieldName as any })
	const priceValue = useWatch({ control: form.control, name: priceFieldName as any })

	// Only use the values if product is actually in the form
	const quantity = index >= 0 ? quantityValue || 0 : 0
	const currentPrice = index >= 0 ? priceValue || 0 : 0
	const previousQuantityRef = useRef<number>(quantity)

	useEffect(() => {
		if (index >= 0 && productIdFieldName) {
			const currentProductId = form.getValues(productIdFieldName as any)
			if (!currentProductId) {
				form.setValue(productIdFieldName as any, product.id, { shouldValidate: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index])

	useEffect(() => {
		// Only calculate price if product is in store and has valid index
		if (!isProductInStore || index < 0 || !priceFieldName) return

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
			const currentPriceValue = form.getValues(priceFieldName as any)

			// Only update if the price actually changed
			if (currentPriceValue !== calculatedPrice) {
				form.setValue(priceFieldName as any, calculatedPrice, { shouldValidate: false, shouldDirty: false })
			}
		} else {
			const currentPriceValue = form.getValues(priceFieldName as any)
			if (currentPriceValue !== 0) {
				form.setValue(priceFieldName as any, 0, { shouldValidate: false, shouldDirty: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantity, isProductInStore, index, priceFieldName])

	const totalPrice = currentPrice

	const handleToggleProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isProductInStore) {
			store.removeItem(product.id)
		} else {
			store.addItem(product)
		}
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
					<NumericInput
						placeholder={t('General.quantityPlaceholder')}
						allowNegative={false}
						decimalScale={0}
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
