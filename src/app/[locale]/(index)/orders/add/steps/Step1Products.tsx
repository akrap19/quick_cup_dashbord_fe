'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'

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

const gridStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	columnGap: tokens.spacing[6],
	rowGap: tokens.spacing[6]
}

export const Step1Products = ({ products = [], myProducts = [], selectedItems = [], acquisitionType }: Props) => {
	const t = useTranslations()
	const { getStep1Data, setStep1Data } = useOrderWizardStore()
	const step1Data = getStep1Data(acquisitionType)

	const allProductsForValidation = useMemo(() => [...products, ...myProducts], [products, myProducts])
	const step1Schema = useMemo(() => createStep1Schema(() => allProductsForValidation), [allProductsForValidation])

	const initialProducts = useMemo(
		() =>
			step1Data?.products ||
			selectedItems.map(product => ({
				productId: product.id,
				quantity: 0
			})),
		[step1Data?.products, selectedItems]
	)

	const form = useForm<Step1Schema>({
		mode: 'onChange',
		resolver: zodResolver(step1Schema),
		defaultValues: { products: initialProducts },
		shouldUnregister: false
	})

	const formProducts = useWatch({ control: form.control, name: 'products' }) || []

	// Sync form with store when selectedItems change
	useEffect(() => {
		const currentFormProducts = form.getValues('products') || []
		const currentProductIds = new Set(currentFormProducts.map((p: any) => p.productId))
		const selectedProductIds = new Set(selectedItems.map(p => p.id))

		const productsToAdd = selectedItems
			.filter(p => !currentProductIds.has(p.id))
			.map(product => ({ productId: product.id, quantity: 0 }))

		const updatedProducts = currentFormProducts.filter((p: any) => selectedProductIds.has(p.productId))

		if (productsToAdd.length > 0 || updatedProducts.length !== currentFormProducts.length) {
			form.setValue('products', [...updatedProducts, ...productsToAdd], { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItems.map(p => p.id).join(',')])

	// Save to store when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const stepData: Step1ProductsData = {
				products: (data.products || []).filter((p): p is { productId: string; quantity: number } => !!p)
			}
			setStep1Data(stepData, acquisitionType)
		})
		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

	const renderProductGrid = (productList: Product[]) => (
		<div style={gridStyle}>
			{productList.map((product: Product) => {
				const index = formProducts.findIndex(p => p.productId === product.id)
				return <OrderProductCard key={product.id} product={product} index={index} acquisitionType={acquisitionType} />
			})}
		</div>
	)

	const hasAnyProducts = products.length > 0 || myProducts.length > 0

	return (
		<FormProvider {...form}>
			<Stack gap={6}>
				<Text fontSize="small" color="destructive.500">
					{t('General.productsRequirements')}
				</Text>
				{hasAnyProducts ? (
					<Stack gap={6}>
						{products.length > 0 && renderProductGrid(products)}
						{myProducts.length > 0 && (
							<Stack gap={4}>
								<Heading variant="h4" color="neutral.900">
									{t('Rent.myProducts')}
								</Heading>
								{renderProductGrid(myProducts)}
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
