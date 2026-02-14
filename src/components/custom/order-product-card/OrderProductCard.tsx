'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { ItemCarousel } from '@/components/custom/item-carousel/ItemCarousel'
import Image from 'next/image'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { DownloadIcon } from '@/components/icons/download-icon'
import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { Product } from 'api/models/products/product'
import { FormControl } from '@/components/inputs/form-control'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { OrderProductCardContainer } from '@/components/custom/order-product-card-container'
import { downloadDesignTemplate } from 'api/services/products'
import { tokens } from '@/style/theme.css'
import { Tooltip } from '@/components/overlay/tooltip'

interface OrderProductCardProps {
	product: Product
	index: number
	acquisitionType: AcquisitionTypeEnum
}

export const OrderProductCard = ({ product, index, acquisitionType }: OrderProductCardProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const searchParams = useSearchParams()
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const store = isRent ? useRentStore() : useBuyStore()

	const isValidIndex = index >= 0
	const quantityFieldName = isValidIndex ? `products.${index}.quantity` : ''
	const productIdFieldName = isValidIndex ? `products.${index}.productId` : ''

	const productIdInForm = useWatch({ control: form.control, name: productIdFieldName as any })

	const searchQuery = useMemo(
		() => (quantityFieldName ? (qs.parse(searchParams.toString())[quantityFieldName] as string) || '' : ''),
		[quantityFieldName, searchParams]
	)

	const isProductInStore = store.selectedItems.some(item => item.id === product.id)
	const isProductInForm = isValidIndex && productIdInForm === product.id
	const isProductSelected = isProductInStore || isProductInForm

	// Initialize productId and sync store/form
	useEffect(() => {
		if (isValidIndex) {
			const currentProductId = form.getValues(productIdFieldName as any)
			if (!currentProductId) {
				form.setValue(productIdFieldName as any, product.id, { shouldValidate: false })
			}
		}

		if (isProductInForm && !isProductInStore) {
			store.addItem(product)
		}

		if (!isProductSelected && isValidIndex) {
			const currentProductId = form.getValues(productIdFieldName as any)
			if (currentProductId === product.id || !currentProductId) {
				form.setValue(quantityFieldName as any, undefined, { shouldValidate: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, isProductInForm, isProductInStore, isProductSelected, product.id])

	const quantityOptions = useMemo(() => {
		if (!product.quantityPerUnit || product.quantityPerUnit <= 0) return []

		const allOptions = Array.from({ length: 500 }, (_, i) => {
			const units = i + 1
			const overallQuantity = units * product.quantityPerUnit
			return {
				id: overallQuantity.toString(),
				name: `${units}(${overallQuantity})`
			}
		})

		if (!searchQuery.trim()) return allOptions

		const query = searchQuery.toLowerCase().trim()
		return allOptions.filter(option => {
			const nameMatch = option.name?.toLowerCase().includes(query)
			const idMatch = option.id?.toLowerCase().includes(query)
			const numberMatch = option.name?.match(/\d+/g)?.some(num => num.includes(query))
			return nameMatch || idMatch || numberMatch
		})
	}, [product.quantityPerUnit, searchQuery])

	const handleToggleProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isProductSelected) {
			store.removeItem(product.id)
			if (isValidIndex) {
				form.setValue(productIdFieldName as any, undefined, { shouldValidate: false })
				form.setValue(quantityFieldName as any, undefined, { shouldValidate: false })
			}
		} else {
			store.addItem(product)
		}
	}

	const handleDownloadDesignTemplate = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		if (product.designTemplate) {
			await downloadDesignTemplate(product.id, product.designTemplate.name)
		}
	}

	const images = product?.images?.length > 0 ? product.images : [{ url: '/images/no_image_placeholder.png' }]

	const imageSection = (
		<ItemCarousel>
			{images.map((item: any, imgIndex: number) => {
				const imageUrl = typeof item === 'string' ? item : item?.url || item
				return (
					<Image
						key={imageUrl || imgIndex}
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
				<Text color="neutral.700">{t('General.unitQuantity')}</Text>
				{isValidIndex ? (
					<FormControl name={quantityFieldName as any}>
						<SearchDropdown options={quantityOptions} placeholder={''} disabled={!isProductSelected} alwaysShowSearch />
					</FormControl>
				) : (
					<SearchDropdown options={[]} placeholder={''} disabled={true} />
				)}
			</Box>
		</>
	)

	const rightSection = (
		<Stack alignItems="flex-end" justifyContent="space-between" gap={2} style={{ height: '150px' }}>
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

			{product.designTemplate && !isRent ? (
				<Tooltip content={`${t('General.download')} ${t('General.designTemplate').toLowerCase()}`} side="top">
					<Button
						variant="primary"
						size="icon"
						onClick={handleDownloadDesignTemplate}
						type="button"
						style={{ fill: tokens.colors['primary.500'] }}>
						<DownloadIcon size="small" />
					</Button>
				</Tooltip>
			) : (
				<div />
			)}
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
