'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { FormControl } from '@/components/inputs/form-control'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'

interface AdditionalCostListItemProps {
	additionalCost: AdditionalCosts
	index: number
	isEditMode?: boolean
	orderStatus?: string
}

export const AdditionalCostListItem = ({
	additionalCost,
	index,
	isEditMode = false,
	orderStatus
}: AdditionalCostListItemProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const isIncludedFieldName = `additionalCosts.${index}.isIncluded`
	const quantityFieldName = `additionalCosts.${index}.quantity`
	const priceFieldName = `additionalCosts.${index}.price`
	const additionalCostIdFieldName = `additionalCosts.${index}.additionalCostId`

	const isIncluded = useWatch({ control: form.control, name: isIncludedFieldName }) || false
	const quantity = useWatch({ control: form.control, name: quantityFieldName }) || 0
	const currentPrice = useWatch({ control: form.control, name: priceFieldName }) || 0
	const previousQuantityRef = useRef<number>(quantity)
	const isByPiece = additionalCost.billingType === BillingTypeEnum.BY_PIECE
	const isBeforePayment = additionalCost.methodOfPayment === MethodOfPayment.BEFORE

	const isCreateMode = !isEditMode
	const isReadOnlyInCreate = isCreateMode && !isBeforePayment
	// In edit mode: "before" payment items can always be edited, "after" payment items only when status is IN_TRANSIT
	const canEditQuantity = isEditMode && (isBeforePayment || orderStatus === OrderStatusEnum.IN_TRANSIT)
	const canEditQuantityInCreate = isCreateMode && isBeforePayment
	const showQuantityInput = (canEditQuantity || canEditQuantityInCreate) && isIncluded && isByPiece

	useEffect(() => {
		const currentAdditionalCostId = form.getValues(additionalCostIdFieldName)
		if (!currentAdditionalCostId) {
			form.setValue(additionalCostIdFieldName, additionalCost.id, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!isIncluded) {
			form.setValue(priceFieldName, 0, { shouldValidate: false, shouldDirty: false })
			if (!isByPiece) {
				form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
			}
			return
		}

		if (isByPiece) {
			if (previousQuantityRef.current === quantity) {
				return
			}
			previousQuantityRef.current = quantity

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
	}, [isIncluded, quantity, isByPiece])

	useEffect(() => {
		if (!isIncluded && isByPiece) {
			form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece])

	// For create mode with 'after' payment: show price per item. For 'before' or edit mode: show calculated price if included
	const displayPrice = isReadOnlyInCreate ? additionalCost.price : isIncluded ? currentPrice : 0

	return (
		<Box paddingY={3} paddingX={0} style={{ borderBottom: '1px solid #E5E7EB' }}>
			<Inline justifyContent="space-between" alignItems="center" gap={3}>
				<Box display="flex" style={{ flex: 1 }}>
					<Inline justifyContent="flex-start" alignItems="center" gap={3}>
						{!isReadOnlyInCreate && (
							<Button
								variant={isIncluded ? 'destructive' : 'success'}
								size="icon"
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									form.setValue(isIncludedFieldName, !isIncluded, { shouldValidate: true })
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
							{showQuantityInput && (
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
							)}
							{!isReadOnlyInCreate && isIncluded && isByPiece && !showQuantityInput && (
								<Inline alignItems="center" justifyContent="center" gap={2}>
									<Text color="neutral.700">{'- ' + t('General.quantity') + ': ' + quantity}</Text>
								</Inline>
							)}
						</Inline>
					</Inline>
				</Box>
				<Box display="flex" alignItems="flex-start" paddingTop={1}>
					<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
						{displayPrice.toFixed(3)}€
					</Text>
				</Box>
			</Inline>
		</Box>
	)
}
