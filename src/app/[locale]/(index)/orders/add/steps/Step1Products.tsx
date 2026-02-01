'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useRef, useMemo } from 'react'

import { OrderProductCard } from '@/components/custom/order-product-card/OrderProductCard'
import { Product } from 'api/models/products/product'
import { createStep1Schema } from 'schemas'
import { useOrderWizardStore, Step1ProductsData } from '@/store/order-wizard'
import { tokens } from '@/style/theme.css'
import { NoResult } from '@/components/custom/no-result/NoResult'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'

type Step1Schema = z.infer<ReturnType<typeof createStep1Schema>>

interface Props {
	products?: Product[]
	myProducts?: Product[]
	selectedItems?: Product[]
	acquisitionType: AcquisitionTypeEnum
}

export const Step1Products = ({
	products = [],
	myProducts = [],
	selectedItems = [],
	acquisitionType
}: Props) => {
	const t = useTranslations()
	const { getStep1Data, setStep1Data } = useOrderWizardStore()
	const step1Data = getStep1Data(acquisitionType)

	// Combine all products for validation
	const allProductsForValidation = useMemo(() => [...products, ...myProducts], [products, myProducts])

	// Use ref to always access the latest products array in validation
	const productsRef = useRef<Product[]>(allProductsForValidation)
	useEffect(() => {
		productsRef.current = allProductsForValidation
	}, [allProductsForValidation])

	// Initialize form with products from selectedItems (those in store) or from step1Data
	const getInitialProducts = () => {
		if (step1Data?.products) {
			return step1Data.products
		}
		// Only initialize products that are in selectedItems (store)
		return selectedItems.map(product => ({
			productId: product.id,
			quantity: 0
		}))
	}

	const step1Schema = useMemo(
		() => createStep1Schema(() => productsRef.current),
		[] // Empty deps - productsRef.current will always have the latest value
	)

	const form = useForm<Step1Schema>({
		mode: 'onChange',
		resolver: zodResolver(step1Schema),
		defaultValues: {
			products: getInitialProducts()
		},
		shouldUnregister: false
	})

	const formProducts = useWatch({ control: form.control, name: 'products' }) || []

	// Sync form with store when selectedItems change
	useEffect(() => {
		const currentFormProducts = form.getValues('products') || []
		const currentProductIds = new Set(currentFormProducts.map((p: any) => p.productId))
		const selectedProductIds = new Set(selectedItems.map(p => p.id))

		// Add products that are in store but not in form
		const productsToAdd = selectedItems.filter(p => !currentProductIds.has(p.id))
		if (productsToAdd.length > 0) {
			const newProducts = productsToAdd.map(product => ({
				productId: product.id,
				quantity: 0
			}))
			form.setValue('products', [...currentFormProducts, ...newProducts], { shouldValidate: false })
		}

		// Remove products that are not in store anymore
		const productsToRemove = currentFormProducts.filter((p: any) => !selectedProductIds.has(p.productId))
		if (productsToRemove.length > 0) {
			// Clear quantities for products being removed before filtering
			productsToRemove.forEach((productToRemove: any, removeIndex: number) => {
				const originalIndex = currentFormProducts.findIndex((p: any) => p.productId === productToRemove.productId)
				if (originalIndex >= 0) {
					form.setValue(`products.${originalIndex}.quantity`, undefined as any, { shouldValidate: false })
					form.setValue(`products.${originalIndex}.productId`, undefined as any, { shouldValidate: false })
				}
			})
			const updatedProducts = currentFormProducts.filter((p: any) => selectedProductIds.has(p.productId))
			form.setValue('products', updatedProducts, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItems.map(p => p.id).join(',')])

	// Track if this is the first callback to skip initial calculation
	const isFirstCallback = useRef(true)

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			// Skip calculation on first callback (when navigating to step)
			if (isFirstCallback.current) {
				isFirstCallback.current = false
				const stepData: Step1ProductsData = {
					products: (data.products || []).filter((p): p is { productId: string; quantity: number } => !!p)
				}
				setStep1Data(stepData, acquisitionType)
				return
			}
			const stepData: Step1ProductsData = {
				products: (data.products || []).filter((p): p is { productId: string; quantity: number } => !!p)
			}
			setStep1Data(stepData, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

	const hasProducts = products && products.length > 0
	const hasMyProducts = myProducts && myProducts.length > 0
	const hasAnyProducts = hasProducts || hasMyProducts

	return (
		<FormProvider {...form}>
			<Stack gap={6}>
				<Text fontSize="small" color="destructive.500">
					{t('General.productsRequirements')}
				</Text>
				{hasAnyProducts ? (
					<Stack gap={6}>
						{hasProducts && (
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									columnGap: tokens.spacing[6],
									rowGap: tokens.spacing[6]
								}}>
								{products.map((product: Product) => {
									// Find the exact index of this product in the form array
									const index = formProducts.findIndex(p => p.productId === product.id)
									return (
										<OrderProductCard
											key={product.id}
											product={product}
											index={index}
											acquisitionType={acquisitionType}
										/>
									)
								})}
							</div>
						)}
						{hasMyProducts && (
							<Stack gap={4}>
								<Heading variant="h4" color="neutral.900">
									{t('Rent.myProducts')}
								</Heading>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										columnGap: tokens.spacing[6],
										rowGap: tokens.spacing[6]
									}}>
									{myProducts.map((product: Product) => {
										// Find the exact index of this product in the form array
										const index = formProducts.findIndex(p => p.productId === product.id)
										return (
											<OrderProductCard
												key={product.id}
												product={product}
												index={index}
												acquisitionType={acquisitionType}
											/>
										)
									})}
								</div>
							</Stack>
						)}
					</Stack>
				) : (
					<NoResult size="large" noResoultMessage="General.noAvailableProducts" />
				)}
			</Stack>
		</FormProvider>
	)
}
