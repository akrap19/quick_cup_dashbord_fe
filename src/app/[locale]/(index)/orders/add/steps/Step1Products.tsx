'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'

import { OrderProductCard } from '@/components/custom/order-product-card/OrderProductCard'
import { Product } from 'api/models/products/product'
import { requiredString } from 'schemas'
import { useOrderWizardStore, Step1ProductsData } from '@/store/order-wizard'
import { ProductPrice } from 'api/models/products/productPrice'
import { tokens } from '@/style/theme.css'

const orderProductSchema = z.object({
	productId: requiredString.shape.scheme,
	quantity: z.coerce.number().min(0),
	price: z.coerce.number().min(0)
})

const step1Schema = z.object({
	products: z
		.array(orderProductSchema)
		.refine(products => products.length === 0 || products.some(p => Number(p.quantity) > 0), {
			message: 'At least one product must have quantity greater than 0'
		})
})

type Step1Schema = z.infer<typeof step1Schema>

interface Props {
	products?: Product[]
	selectedItems?: Product[]
}

export const Step1Products = ({ products = [], selectedItems = [] }: Props) => {
	const { step1Data, setStep1Data, setTotalAmount } = useOrderWizardStore()

	// Initialize form with products from selectedItems (those in store) or from step1Data
	const getInitialProducts = () => {
		if (step1Data?.products) {
			return step1Data.products
		}
		// Only initialize products that are in selectedItems (store)
		return selectedItems.map(product => ({
			productId: product.id,
			quantity: 0,
			price: 0
		}))
	}

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
				quantity: 0,
				price: 0
			}))
			form.setValue('products', [...currentFormProducts, ...newProducts], { shouldValidate: false })
		}

		// Remove products that are not in store anymore
		const productsToRemove = currentFormProducts.filter((p: any) => !selectedProductIds.has(p.productId))
		if (productsToRemove.length > 0) {
			const updatedProducts = currentFormProducts.filter((p: any) => selectedProductIds.has(p.productId))
			form.setValue('products', updatedProducts, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItems.map(p => p.id).join(',')])

	// Calculate prices based on quantity
	useEffect(() => {
		formProducts.forEach((formProduct, index) => {
			if (!formProduct) return
			const product = products.find(p => p.id === formProduct.productId)
			if (!product) return

			const quantity = Number(formProduct.quantity) || 0
			if (quantity > 0) {
				const singleProductPrice =
					product.prices.find((price: ProductPrice) => {
						const minQty = price?.minQuantity ?? 0
						const maxQty = price?.maxQuantity ?? Infinity
						return quantity >= minQty && quantity <= maxQty
					})?.price ?? 0

				const calculatedPrice = Number.parseFloat((singleProductPrice * quantity).toFixed(3))
				const currentPrice = form.getValues(`products.${index}.price`)

				if (currentPrice !== calculatedPrice) {
					form.setValue(`products.${index}.price`, calculatedPrice, { shouldValidate: false, shouldDirty: false })
				}
			} else {
				const currentPrice = form.getValues(`products.${index}.price`)
				if (currentPrice !== 0) {
					form.setValue(`products.${index}.price`, 0, { shouldValidate: false, shouldDirty: false })
				}
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formProducts.map(p => p.quantity).join(',')])

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const productsTotal = (data.products || []).reduce((sum, product) => sum + (product?.price || 0), 0)
			setTotalAmount(productsTotal)

			const stepData: Step1ProductsData = {
				products: (data.products || []).filter((p): p is { productId: string; quantity: number; price: number } => !!p)
			}
			setStep1Data(stepData)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch])

	// Calculate initial total
	useEffect(() => {
		const productsTotal = formProducts.reduce((sum, product) => sum + (product.price || 0), 0)
		setTotalAmount(productsTotal)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<FormProvider {...form}>
			{products && products.length > 0 ? (
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
						return <OrderProductCard key={product.id} product={product} index={index} />
					})}
				</div>
			) : (
				<div>No products available</div>
			)}
		</FormProvider>
	)
}
