'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { Product } from 'api/models/products/product'
import { Order } from 'api/models/order/order'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useOrderWizardStore } from '@/store/order-wizard'
import { applyDiscount } from '@/utils/discount'

interface AdditionalCostListItemProps {
	additionalCost: AdditionalCosts
	index: number
	isEditMode?: boolean
	orderStatus?: string
	order?: Order
	products?: Product[]
	acquisitionType?: AcquisitionTypeEnum
}

export const AdditionalCostListItem = ({
	additionalCost,
	index,
	isEditMode = false,
	orderStatus,
	order,
	products = [],
	acquisitionType
}: AdditionalCostListItemProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const { getStep4Data, currentAcquisitionType } = useOrderWizardStore()
	const effectiveAcquisitionType = acquisitionType || currentAcquisitionType
	const step4Data = effectiveAcquisitionType ? getStep4Data(effectiveAcquisitionType) : undefined
	const discount = step4Data?.discount
	const isIncludedFieldName = `additionalCosts.${index}.isIncluded`
	const quantityFieldName = `additionalCosts.${index}.quantity`
	const priceFieldName = `additionalCosts.${index}.price`
	const additionalCostIdFieldName = `additionalCosts.${index}.additionalCostId`
	const productQuantitiesFieldName = `additionalCosts.${index}.productQuantities`

	const isIncluded = useWatch({ control: form.control, name: isIncludedFieldName }) || false
	const quantity = useWatch({ control: form.control, name: quantityFieldName }) || 0
	const currentPrice = useWatch({ control: form.control, name: priceFieldName }) || 0
	const productQuantities = useWatch({ control: form.control, name: productQuantitiesFieldName }) || {}
	const previousQuantityRef = useRef<number>(quantity)
	const previousProductQuantitiesSumRef = useRef<number>(0)
	const isByPiece = additionalCost.billingType === BillingTypeEnum.BY_PIECE
	const isBeforePayment = additionalCost.methodOfPayment === MethodOfPayment.BEFORE
	const isAfterPayment = additionalCost.methodOfPayment === MethodOfPayment.AFTER

	const isCreateMode = !isEditMode
	const isReadOnlyInCreate = isCreateMode && !isBeforePayment

	// Show product quantity fields for "after" payment method in edit mode
	const showProductQuantityFields =
		isEditMode && isAfterPayment && isIncluded && order && order.status !== OrderStatusEnum.PENDING

	// Get form products
	const formProducts = useWatch({ control: form.control, name: 'products' }) || []

	// Initialize productQuantities for "after" payment method
	useEffect(() => {
		if (showProductQuantityFields && products.length > 0) {
			const currentProductQuantities = form.getValues(productQuantitiesFieldName)
			if (!currentProductQuantities || Object.keys(currentProductQuantities).length === 0) {
				const initialQuantities: Record<string, number> = {}
				products.forEach(product => {
					const formProduct = formProducts.find((p: any) => p.productId === product.id)
					initialQuantities[product.id] = formProduct?.quantity || 0
				})
				if (Object.keys(initialQuantities).length > 0) {
					form.setValue(productQuantitiesFieldName, initialQuantities, { shouldValidate: false, shouldDirty: false })
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showProductQuantityFields, products.length])

	useEffect(() => {
		const currentAdditionalCostId = form.getValues(additionalCostIdFieldName)
		if (!currentAdditionalCostId) {
			form.setValue(additionalCostIdFieldName, additionalCost.id, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Update quantity from productQuantities when productQuantities change
	useEffect(() => {
		if (!isIncluded || !isByPiece || !showProductQuantityFields) {
			return
		}

		if (productQuantities && Object.keys(productQuantities).length > 0) {
			const productQuantitiesValues = Object.values(productQuantities) as number[]
			const productQuantitiesSum = productQuantitiesValues.reduce((sum, qty) => sum + (Number(qty) || 0), 0)

			// Only update if the sum actually changed
			if (productQuantitiesSum !== previousProductQuantitiesSumRef.current) {
				previousProductQuantitiesSumRef.current = productQuantitiesSum
				const currentQuantity = form.getValues(quantityFieldName)
				if (currentQuantity !== productQuantitiesSum) {
					form.setValue(quantityFieldName, productQuantitiesSum, { shouldValidate: false, shouldDirty: false })
					previousQuantityRef.current = productQuantitiesSum
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece, showProductQuantityFields, productQuantities])

	// Calculate price based on quantity
	useEffect(() => {
		if (!isIncluded) {
			const currentPriceValue = form.getValues(priceFieldName)
			if (currentPriceValue !== 0) {
				form.setValue(priceFieldName, 0, { shouldValidate: false, shouldDirty: false })
			}
			if (!isByPiece) {
				const currentQuantity = form.getValues(quantityFieldName)
				if (currentQuantity !== 0) {
					form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
				}
			}
			previousQuantityRef.current = 0
			previousProductQuantitiesSumRef.current = 0
			return
		}

		if (isByPiece) {
			// Only proceed if quantity actually changed
			if (previousQuantityRef.current === quantity) {
				return
			}
			previousQuantityRef.current = quantity

			// Calculate and update price
			if (quantity > 0) {
				const calculatedPrice = Number.parseFloat((additionalCost.price * quantity).toFixed(3))
				const currentPriceValue = form.getValues(priceFieldName)

				if (currentPriceValue !== calculatedPrice) {
					form.setValue(priceFieldName, calculatedPrice, { shouldValidate: false, shouldDirty: false })
				}
			} else {
				const currentPriceValue = form.getValues(priceFieldName)
				if (currentPriceValue !== 0) {
					form.setValue(priceFieldName, 0, { shouldValidate: false, shouldDirty: false })
				}
			}
		} else {
			// For one_time billing, price is always the same and quantity should be 1
			const currentPriceValue = form.getValues(priceFieldName)
			const currentQuantity = form.getValues(quantityFieldName)

			if (currentPriceValue !== additionalCost.price) {
				form.setValue(priceFieldName, additionalCost.price, { shouldValidate: false, shouldDirty: false })
			}
			if (currentQuantity !== 1) {
				form.setValue(quantityFieldName, 1, { shouldValidate: false, shouldDirty: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, quantity, isByPiece, additionalCost.price])

	useEffect(() => {
		if (!isIncluded && isByPiece) {
			form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece])

	const baseDisplayPrice = isReadOnlyInCreate ? additionalCost.price : isIncluded ? currentPrice : additionalCost.price
	const displayPrice = applyDiscount(baseDisplayPrice, discount)

	const showButton = isAfterPayment ? (isEditMode ? orderStatus !== OrderStatusEnum.PENDING : false) : true
	const buttonEnabled = isAfterPayment || (isBeforePayment && !isReadOnlyInCreate)

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
									disabled={!buttonEnabled}
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										if (buttonEnabled) {
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
							<Inline alignItems="center" justifyContent="center" gap={1}>
								<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
									{additionalCost.name}
								</Text>
								{/* {showQuantityInput && (
									<Inline alignItems="center" justifyContent="center" gap={2}>
										<Text color="neutral.700">{'- ' + t('General.quantity')}</Text>
										<FormControl name={quantityFieldName as any}>
											<NumericInput
												placeholder={t('General.quantityPlaceholder')}
												allowNegative={false}
												decimalScale={0}
											/>
										</FormControl>
									</Inline>
								)} */}
							</Inline>
						</Inline>
					</Box>
					<Box display="flex" alignItems="flex-start" paddingTop={1}>
						<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
							{displayPrice.toFixed(3)}€
						</Text>
					</Box>
				</Inline>
				{showProductQuantityFields && products.length > 0 && (
					<Box paddingLeft={showButton ? 5 : 0}>
						<Stack gap={2}>
							{products.map(product => {
								return (
									<Inline key={product.id} alignItems="center" gap={2}>
										<Text color="neutral.700" fontSize="small" style={{ minWidth: '120px' }}>
											{product.name}:
										</Text>
										<Box style={{ width: '140px' }}>
											<Controller
												defaultValue={productQuantities[product.id] || 0}
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
