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
import { getProductPrices } from 'api/services/products'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'
import { Stack } from '@/components/layout/stack'
import { applyDiscount } from '@/utils/discount'
import { Order } from 'api/models/order/order'

type Step1Schema = z.infer<ReturnType<typeof createStep1Schema>>

interface Props {
	products?: Product[]
	selectedItems?: Product[]
	acquisitionType: AcquisitionTypeEnum
	order?: Order
}

export const Step1Products = ({ products = [], selectedItems = [], acquisitionType, order }: Props) => {
	const t = useTranslations()
	const { getStep1Data, getStep2Data, getStep3Data, getStep4Data, getCustomerId, setStep1Data, setTotalAmount } =
		useOrderWizardStore()
	const step1Data = getStep1Data(acquisitionType)
	const step2Data = getStep2Data(acquisitionType)
	const step3Data = getStep3Data(acquisitionType)
	const step4Data = getStep4Data(acquisitionType)
	const discount = step4Data?.discount
	const customerId = getCustomerId(acquisitionType)

	// Use ref to always access the latest products array in validation
	const productsRef = useRef<Product[]>(products)
	useEffect(() => {
		productsRef.current = products
	}, [products])

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

	// Track if this is the first callback to skip initial calculation
	const isFirstCallback = useRef(true)

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			// Skip calculation on first callback (when navigating to step)
			if (isFirstCallback.current) {
				isFirstCallback.current = false
				const stepData: Step1ProductsData = {
					products: (data.products || []).filter(
						(p): p is { productId: string; quantity: number; price: number } => !!p
					)
				}
				setStep1Data(stepData, acquisitionType)
				return
			}
			const stepData: Step1ProductsData = {
				products: (data.products || []).filter((p): p is { productId: string; quantity: number; price: number } => !!p)
			}
			setStep1Data(stepData, acquisitionType)

			// Calculate total with all items from store (products, services, additional costs)
			const productsTotal = (data.products || []).reduce((sum, product) => sum + (product?.price || 0), 0)
			const servicesTotal =
				step2Data?.services?.reduce((sum, s) => {
					return sum + (s.isIncluded ? s.price || 0 : 0)
				}, 0) || 0
			const additionalCostsTotal =
				step3Data?.additionalCosts?.reduce((sum, ac) => sum + (ac.isIncluded ? ac.price || 0 : 0), 0) || 0

			const baseTotal = productsTotal + servicesTotal + additionalCostsTotal

			// In edit mode, check if prices match order prices (already discounted)
			let shouldApplyDiscount = true
			if (order) {
				const orderProductsTotal = order.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
				const orderServicesTotal = order.services?.reduce((sum, s) => sum + (s.price || 0), 0) || 0
				const orderAdditionalCostsTotal = order.additionalCosts?.reduce((sum, ac) => sum + (ac.price || 0), 0) || 0

				const step1Matches = Math.abs(productsTotal - orderProductsTotal) < 0.001
				const step2Matches = Math.abs(servicesTotal - orderServicesTotal) < 0.001
				const step3Matches = Math.abs(additionalCostsTotal - orderAdditionalCostsTotal) < 0.001

				// If all match, prices are already discounted, so don't apply discount again
				if (step1Matches && step2Matches && step3Matches) {
					shouldApplyDiscount = false
				}
			}

			// Apply discount only if needed
			const finalTotal = shouldApplyDiscount ? applyDiscount(baseTotal, discount) : baseTotal
			setTotalAmount(finalTotal, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, discount, acquisitionType, order, step2Data, step3Data])

	return (
		<FormProvider {...form}>
			<Stack gap={6}>
				<Text fontSize="small" color="destructive.500">
					{t('General.productsRequirements')}
				</Text>
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
							return (
								<OrderProductCard key={product.id} product={product} index={index} acquisitionType={acquisitionType} />
							)
						})}
					</div>
				) : (
					<NoResult size="large" noResoultMessage="General.noAvailableProducts" />
				)}
			</Stack>
		</FormProvider>
	)
}
