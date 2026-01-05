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
	const quantityFieldName = index >= 0 ? `products.${index}.quantity` : ''
	const productIdFieldName = index >= 0 ? `products.${index}.productId` : ''
	const priceFieldName = index >= 0 ? `products.${index}.price` : ''
	const priceValue = useWatch({ control: form.control, name: priceFieldName as any })
	const currentPrice = index >= 0 ? priceValue || 0 : 0
	const productIdInForm = useWatch({ control: form.control, name: productIdFieldName as any })
	const quantityValue = useWatch({ control: form.control, name: quantityFieldName as any })

	// Check if product is in store OR in form (for edit mode when store might not be initialized yet)
	const isProductInStore = store.selectedItems.some(item => item.id === product.id)
	const isProductInForm = index >= 0 && productIdInForm === product.id
	const isProductSelected = isProductInStore || isProductInForm

	useEffect(() => {
		if (index >= 0 && productIdFieldName) {
			const currentProductId = form.getValues(productIdFieldName as any)
			if (!currentProductId) {
				form.setValue(productIdFieldName as any, product.id, { shouldValidate: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index])

	// Sync store with form data - if product is in form but not in store, add it to store
	useEffect(() => {
		if (isProductInForm && !isProductInStore) {
			store.addItem(product)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isProductInForm, isProductInStore, product.id])

	// Clear quantity and price when product is deselected
	useEffect(() => {
		if (!isProductSelected) {
			if (index >= 0) {
				const currentProductId = form.getValues(productIdFieldName as any)
				// Only clear if this field actually belongs to this product
				if (currentProductId === product.id || !currentProductId) {
					form.setValue(quantityFieldName as any, undefined, { shouldValidate: false })
					form.setValue(priceFieldName as any, 0, { shouldValidate: false })
				}
			} else if (quantityValue !== undefined && quantityValue !== null && quantityValue !== '') {
				// If index is -1 but quantity still has a value, clear it from any potential form field
				// This handles the case where the product was just removed but the form hasn't updated yet
				const allProducts = form.getValues('products') || []
				const productIndex = allProducts.findIndex((p: any) => p?.productId === product.id)
				if (productIndex >= 0) {
					form.setValue(`products.${productIndex}.quantity`, undefined, { shouldValidate: false })
					form.setValue(`products.${productIndex}.price`, 0, { shouldValidate: false })
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isProductSelected, index, product.id, quantityValue])

	const totalPrice = currentPrice

	const handleToggleProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isProductSelected) {
			store.removeItem(product.id)

			form.setValue(productIdFieldName as any, undefined, { shouldValidate: false })
			form.setValue(quantityFieldName as any, undefined, { shouldValidate: false })
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
				{index >= 0 && quantityFieldName ? (
					<FormControl name={quantityFieldName as any}>
						<NumericInput
							placeholder={t('General.quantityPlaceholder')}
							allowNegative={false}
							decimalScale={3}
							disabled={!isProductSelected}
						/>
					</FormControl>
				) : (
					<NumericInput
						placeholder={t('General.quantityPlaceholder')}
						allowNegative={false}
						decimalScale={3}
						disabled={true}
						value=""
						readOnly
					/>
				)}
			</Box>
		</>
	)

	const rightSection = (
		<Stack alignItems="flex-end" justifyContent="space-between" style={{ height: '150px' }}>
			<Button
				variant={isProductSelected ? 'destructive' : 'success'}
				size="icon"
				onClick={handleToggleProduct}
				type="button">
				{isProductSelected ? (
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
