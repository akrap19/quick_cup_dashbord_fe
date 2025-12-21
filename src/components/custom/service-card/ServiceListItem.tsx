'use client'

import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect, useMemo, useRef, useCallback } from 'react'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Checkbox } from '@/components/inputs/checkbox'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Service } from 'api/models/services/service'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { Product } from 'api/models/products/product'
import { getServicePrices } from 'api/services/services'
import { useTranslations } from 'next-intl'

interface ServiceListItemProps {
	service: Service
	serviceIndex: number
	products: Product[]
	acquisitionType: AcquisitionTypeEnum
	orderStatus?: string
	isEditMode?: boolean
}

export const ServiceListItem = ({
	service,
	serviceIndex,
	products,
	acquisitionType,
	orderStatus,
	isEditMode = false
}: ServiceListItemProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const serviceIdFieldName = `services.${serviceIndex}.serviceId`
	const isIncludedFieldName = `services.${serviceIndex}.isIncluded`
	const quantityFieldName = `services.${serviceIndex}.quantity`
	const priceFieldName = `services.${serviceIndex}.price`
	const productQuantitiesFieldName = `services.${serviceIndex}.productQuantities`

	const formProducts = useWatch({ control: form.control, name: 'products' }) || []
	const currentPrice = useWatch({ control: form.control, name: priceFieldName }) || 0
	const productQuantities = useWatch({ control: form.control, name: productQuantitiesFieldName }) || {}

	// Determine input type based on acquisition type
	const inputType = acquisitionType === AcquisitionTypeEnum.RENT ? service.inputTypeForRent : service.inputTypeForBuy

	// Check if service is default for this acquisition type
	const isDefault =
		acquisitionType === AcquisitionTypeEnum.RENT ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

	// Don't show checkbox if input type is "after"
	const showCheckbox = inputType !== InputTypeEnum.AFTER && !isDefault

	// Show quantity fields per product if order status is ACCEPTED and input type is not "after"
	const showProductQuantityFields =
		isEditMode && orderStatus === OrderStatusEnum.ACCEPTED && inputType !== InputTypeEnum.AFTER

	// Get products that have this service
	const serviceId = service.id || service.serviceId
	const productsWithService = useMemo(() => {
		return products.filter(product => {
			if (!product.servicePrices || product.servicePrices.length === 0) return false
			return product.servicePrices.some(
				sp => (sp.id && sp.id === serviceId) || (sp.serviceId && sp.serviceId === serviceId)
			)
		})
	}, [products, serviceId])

	useEffect(() => {
		const currentServiceId = form.getValues(serviceIdFieldName)
		const serviceId = service.id || service.serviceId
		if (!currentServiceId && serviceId) {
			form.setValue(serviceIdFieldName, serviceId, { shouldValidate: false })
		}
		// Always set isIncluded to true if service is default (ensure it stays true)
		if (isDefault) {
			form.setValue(isIncludedFieldName, true, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDefault])

	// Initialize productQuantities object if it doesn't exist
	useEffect(() => {
		const currentProductQuantities = form.getValues(productQuantitiesFieldName)
		if (!currentProductQuantities || Object.keys(currentProductQuantities).length === 0) {
			const initialQuantities: Record<string, number> = {}
			productsWithService.forEach(product => {
				const formProduct = formProducts.find((p: any) => p.productId === product.id)
				initialQuantities[product.id] = formProduct?.quantity || 0
			})
			if (Object.keys(initialQuantities).length > 0) {
				form.setValue(productQuantitiesFieldName, initialQuantities, { shouldValidate: false, shouldDirty: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsWithService.length, serviceId])

	// Memoize products for calculation to avoid unnecessary recalculations
	const productsForCalculation = useMemo(() => {
		const result: { productId: string; quantity: number }[] = []

		productsWithService.forEach(product => {
			// Use custom quantity if available and fields are shown, otherwise use product quantity
			let productQuantity = 0
			if (showProductQuantityFields && productQuantities && productQuantities[product.id] !== undefined) {
				productQuantity = productQuantities[product.id] || 0
			} else {
				const formProduct = formProducts.find((p: any) => p.productId === product.id)
				productQuantity = formProduct?.quantity || 0
			}

			if (productQuantity > 0) {
				result.push({
					productId: product.id,
					quantity: productQuantity
				})
			}
		})

		return result
	}, [productsWithService, formProducts, productQuantities, showProductQuantityFields])

	// Ref to track debounce timeout
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const lastCalculationRef = useRef<string>('')

	// Memoize the calculation key to detect actual changes
	const calculationKey = useMemo(() => {
		return JSON.stringify({
			serviceId,
			products: productsForCalculation,
			acquisitionType
		})
	}, [serviceId, productsForCalculation, acquisitionType])

	// Calculate total price for this service across all products using API endpoint
	const calculatePrice = useCallback(async () => {
		if (!serviceId) return

		// If no products with this service, set price to 0
		if (productsForCalculation.length === 0) {
			const currentPriceValue = form.getValues(priceFieldName)
			if (currentPriceValue !== 0) {
				form.setValue(priceFieldName, 0, { shouldValidate: false, shouldDirty: false })
				form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
			}
			return
		}

		try {
			const response = await getServicePrices(serviceId, {
				products: productsForCalculation,
				acquisitionType
			})

			if (response) {
				const calculatedPrice = Number.parseFloat((response.totalPrice || 0).toFixed(3))
				const currentPriceValue = form.getValues(priceFieldName)

				if (currentPriceValue !== calculatedPrice) {
					form.setValue(priceFieldName, calculatedPrice, { shouldValidate: false, shouldDirty: false })
				}

				// Calculate total quantity for reference (sum of all product quantities)
				let totalQuantity = 0
				productsForCalculation.forEach(p => {
					totalQuantity += p.quantity
				})
				form.setValue(quantityFieldName, totalQuantity, { shouldValidate: false, shouldDirty: false })
			}
		} catch (error: any) {
			// On error, set price to 0
			form.setValue(priceFieldName, 0, { shouldValidate: false, shouldDirty: false })
		}
	}, [serviceId, productsForCalculation, acquisitionType, priceFieldName, quantityFieldName, form])

	// Debounced effect for price calculation
	useEffect(() => {
		// Skip if calculation key hasn't changed
		if (lastCalculationRef.current === calculationKey) {
			return
		}

		// Clear existing timeout
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current)
		}

		// Set new debounced calculation
		debounceTimeoutRef.current = setTimeout(() => {
			lastCalculationRef.current = calculationKey
			calculatePrice()
		}, 300) // 300ms debounce delay

		// Cleanup function
		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current)
			}
		}
	}, [calculationKey, calculatePrice])

	// Display price always (it's always calculated), but it's only included in total if checkbox is checked (or default)
	const displayPrice = currentPrice

	return (
		<Box paddingY={3} paddingX={0} style={{ borderBottom: '1px solid #E5E7EB' }}>
			<Stack gap={2}>
				<Inline justifyContent="space-between" alignItems="center" gap={3}>
					<Box display="flex" style={{ flex: 1 }}>
						<Inline justifyContent="flex-start" alignItems="center" gap={3}>
							{showCheckbox && (
								<Box display="flex" alignItems="center">
									<Controller
										name={isIncludedFieldName as any}
										control={form.control}
										render={({ field }) => (
											<Checkbox checked={field.value || false} onChange={e => field.onChange(e.target.checked)} />
										)}
									/>
								</Box>
							)}
							<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
								{service.serviceName || service.name}
							</Text>
						</Inline>
					</Box>
					<Box display="flex" alignItems="flex-start" paddingTop={1}>
						<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
							{displayPrice.toFixed(3)}€
						</Text>
					</Box>
				</Inline>
				{showProductQuantityFields && productsWithService.length > 0 && (
					<Box paddingLeft={showCheckbox ? 5 : 0}>
						<Stack gap={2}>
							{productsWithService.map(product => {
								return (
									<Inline key={product.id} alignItems="center" gap={2}>
										<Text color="neutral.700" fontSize="small" style={{ minWidth: '120px' }}>
											{product.name} {product.size}:
										</Text>
										<Box style={{ width: '140px' }}>
											<Controller
												name={`${productQuantitiesFieldName}.${product.id}` as any}
												control={form.control}
												render={({ field }) => (
													<NumericInput
														placeholder={t('General.quantityPlaceholder')}
														allowNegative={false}
														decimalScale={0}
														value={field.value || 0}
														onValueChange={values => {
															field.onChange(values.floatValue || 0)
														}}
													/>
												)}
											/>
										</Box>
									</Inline>
								)
							})}
						</Stack>
					</Box>
				)}
			</Stack>
		</Box>
	)
}
