'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'

import { OrderProductCard } from '@/components/custom/order-product-card/OrderProductCard'
import { Product } from 'api/models/products/product'
import { requiredString } from 'schemas'
import { useOrderWizardStore, Step1ProductsData } from '@/store/order-wizard'
import { tokens } from '@/style/theme.css'
import { NoResult } from '@/components/custom/no-result/NoResult'
import { getProductPrices } from 'api/services/products'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

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
	acquisitionType: AcquisitionTypeEnum
}

export const Step1Products = ({ products = [], selectedItems = [], acquisitionType }: Props) => {
	const { getStep1Data, getCustomerId, setStep1Data, setTotalAmount } = useOrderWizardStore()
	const step1Data = getStep1Data(acquisitionType)
	const customerId = getCustomerId(acquisitionType)

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
			// Clear quantities for products being removed before filtering
			productsToRemove.forEach((productToRemove: any, removeIndex: number) => {
				const originalIndex = currentFormProducts.findIndex((p: any) => p.productId === productToRemove.productId)
				if (originalIndex >= 0) {
					form.setValue(`products.${originalIndex}.quantity`, undefined as any, { shouldValidate: false })
					form.setValue(`products.${originalIndex}.price`, 0, { shouldValidate: false })
					form.setValue(`products.${originalIndex}.productId`, undefined as any, { shouldValidate: false })
				}
			})
			const updatedProducts = currentFormProducts.filter((p: any) => selectedProductIds.has(p.productId))
			form.setValue('products', updatedProducts, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItems.map(p => p.id).join(',')])

	// Calculate prices using API when quantity changes
	useEffect(() => {
		if (!customerId) return

		const calculatePrices = async () => {
			const currentProducts = form.getValues('products') || []

			for (let index = 0; index < currentProducts.length; index++) {
				const formProduct = currentProducts[index]
				if (!formProduct) continue

				const quantity = Number(formProduct.quantity) || 0

				if (quantity > 0) {
					try {
						const response = await getProductPrices({
							productId: formProduct.productId,
							quantity: quantity,
							userId: customerId
						})

						const totalPrice = response?.data?.totalPrice ?? 0
						form.setValue(`products.${index}.price`, totalPrice, {
							shouldValidate: false,
							shouldDirty: false
						})
					} catch (error) {
						// On error, set price to 0
						form.setValue(`products.${index}.price`, 0, { shouldValidate: false, shouldDirty: false })
					}
				} else {
					form.setValue(`products.${index}.price`, 0, { shouldValidate: false, shouldDirty: false })
				}
			}
		}

		calculatePrices()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formProducts.map(p => `${p.productId}-${p.quantity}`).join(','), customerId])

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const productsTotal = (data.products || []).reduce((sum, product) => sum + (product?.price || 0), 0)
			setTotalAmount(productsTotal, acquisitionType)

			const stepData: Step1ProductsData = {
				products: (data.products || []).filter((p): p is { productId: string; quantity: number; price: number } => !!p)
			}
			setStep1Data(stepData, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

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
				<NoResult size="large" noResoultMessage="General.noAvailableProducts" />
			)}
		</FormProvider>
	)
}
