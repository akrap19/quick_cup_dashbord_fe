'use client'

import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect, useMemo, useRef, useCallback } from 'react'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Service } from 'api/models/services/service'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { Product } from 'api/models/products/product'
import { getServicePrices } from 'api/services/services'
import { useTranslations } from 'next-intl'
import { RequiredLabel } from '@/components/inputs/required-label'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { Base } from 'api/models/common/base'
import { useHasRoleAccess } from '@/hooks/use-has-role-access'
import { UserRoleEnum } from 'enums/userRoleEnum'

interface ServiceListItemProps {
	service: Service
	serviceIndex: number
	products: Product[]
	acquisitionType: AcquisitionTypeEnum
	orderStatus?: string
	isEditMode?: boolean
	serviceLocations?: Base[]
}

export const ServiceListItem = ({
	service,
	serviceIndex,
	products,
	acquisitionType,
	orderStatus,
	isEditMode = false,
	serviceLocations = []
}: ServiceListItemProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const serviceIdFieldName = `services.${serviceIndex}.serviceId`
	const isIncludedFieldName = `services.${serviceIndex}.isIncluded`
	const quantityFieldName = `services.${serviceIndex}.quantity`
	const priceFieldName = `services.${serviceIndex}.price`
	const productQuantitiesFieldName = `services.${serviceIndex}.productQuantities`
	const serviceLocationIdFieldName = `services.${serviceIndex}.serviceLocationId`

	const formProducts = useWatch({ control: form.control, name: 'products' }) || []
	const currentPrice = useWatch({ control: form.control, name: priceFieldName }) || 0
	const isIncluded = useWatch({ control: form.control, name: isIncludedFieldName }) || false
	const productQuantities = useWatch({ control: form.control, name: productQuantitiesFieldName }) || {}
	const isAdminOrMasterAdmin = useHasRoleAccess([UserRoleEnum.ADMIN, UserRoleEnum.MASTER_ADMIN])

	// Determine input type based on acquisition type
	const inputType = acquisitionType === AcquisitionTypeEnum.RENT ? service.inputTypeForRent : service.inputTypeForBuy

	// Check if service is default for this acquisition type
	const isDefault =
		acquisitionType === AcquisitionTypeEnum.RENT ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

	// Show button if input type is not "after" (for both default and non-default items)
	const showButton = inputType !== InputTypeEnum.AFTER

	// Show quantity fields per product if order status is ACCEPTED and input type is not "after"
	const showProductQuantityFields =
		isEditMode && orderStatus !== OrderStatusEnum.PENDING && inputType === InputTypeEnum.AFTER

	// Get service ID
	const serviceId = service.id || service.serviceId

	// Get products that have this service
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

				form.setValue(quantityFieldName, Math.ceil(response.combinedCalculatedQuantity), {
					shouldValidate: false,
					shouldDirty: false
				})
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

	// Get service locations for this specific service
	const locationsForThisService = useMemo(() => {
		if (!serviceId || !serviceLocations) return []
		// Filter locations that belong to this service
		return serviceLocations.filter(location => (location as any).name.includes(service.serviceName || service.name))
	}, [serviceId, serviceLocations])

	// Display price always (it's always calculated), but it's only included in total if checkbox is checked (or default)
	const displayPrice = currentPrice

	return (
		<Box paddingY={3} paddingX={0} style={{ borderBottom: '1px solid #E5E7EB' }}>
			<Stack gap={2}>
				<Inline justifyContent="space-between" alignItems="center" gap={3}>
					<Box display="flex" style={{ flex: 1 }}>
						<Inline justifyContent="flex-start" alignItems="center" gap={3}>
							{showButton && (
								<Button
									variant={isIncluded ? 'destructive' : 'success'}
									size="icon"
									disabled={isDefault}
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										if (!isDefault) {
											form.setValue(isIncludedFieldName, !isIncluded, { shouldValidate: true })
										}
									}}
									type="button">
									{isIncluded ? (
										<MinusIcon size="small" color="shades.00" />
									) : (
										<PlainPlusIcon size="small" color="shades.00" />
									)}
								</Button>
							)}
							{isDefault ? (
								<div>
									<RequiredLabel>
										<Text as="span" fontSize="medium" color="neutral.900" fontWeight="semibold">
											{service.serviceName || service.name}
										</Text>
									</RequiredLabel>
								</div>
							) : (
								<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
									{service.serviceName || service.name}
								</Text>
							)}
						</Inline>
					</Box>
					<Box display="flex" alignItems="flex-start" paddingTop={1}>
						<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
							{displayPrice.toFixed(3)}€
						</Text>
					</Box>
				</Inline>
				{showProductQuantityFields && productsWithService.length > 0 && (
					<Box paddingLeft={showButton ? 5 : 0}>
						<Stack gap={2}>
							{productsWithService.map(product => {
								return (
									<Inline key={product.id} alignItems="center" gap={2}>
										<Text color="neutral.700" fontSize="small" style={{ minWidth: '120px' }}>
											{product.name}:
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
				{isAdminOrMasterAdmin && isIncluded && (
					<Box paddingLeft={showButton ? 5 : 0} paddingTop={2}>
						<Inline alignItems="center" gap={2}>
							<Text color="neutral.700" fontSize="small" style={{ minWidth: '120px' }}>
								{t('General.serviceLocation')}:
							</Text>
							<Box position="relative" style={{ width: '240px' }}>
								<Controller
									name={serviceLocationIdFieldName}
									control={form.control}
									render={({ field }) => (
										<SearchDropdown
											name={field.name}
											options={locationsForThisService}
											placeholder={t('General.serviceLocation')}
											alwaysShowSearch={locationsForThisService.length > 5}
											disabled={!serviceId}
											value={field.value}
										/>
									)}
								/>
							</Box>
						</Inline>
					</Box>
				)}
			</Stack>
		</Box>
	)
}
