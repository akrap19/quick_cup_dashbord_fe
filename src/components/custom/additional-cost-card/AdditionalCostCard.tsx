'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { FormControl } from '@/components/inputs/form-control'
import { Checkbox } from '@/components/inputs/checkbox'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'

interface AdditionalCostCardProps {
	additionalCost: AdditionalCosts
	index: number
}

export const AdditionalCostCard = ({ additionalCost, index }: AdditionalCostCardProps) => {
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

	const displayPrice = isIncluded ? currentPrice : 0

	return (
		<Box paddingY={3} paddingX={3} borderRadius="small" boxShadow="large">
			<Inline justifyContent="space-between" alignItems="flex-start" gap={3}>
				<Box display="flex" style={{ flex: 1 }}>
					<Inline justifyContent="flex-start" alignItems="flex-start" gap={3}>
						<Box display="flex" alignItems="center" paddingTop={1}>
							<Controller
								name={isIncludedFieldName as any}
								control={form.control}
								render={({ field }) => (
									<Checkbox checked={field.value || false} onChange={e => field.onChange(e.target.checked)} />
								)}
							/>
						</Box>
						<Stack justifyContent="space-between" style={{ flex: 1, minHeight: '100px' }}>
							<Text fontSize="big" color="neutral.900" fontWeight="semibold">
								{additionalCost.name}
							</Text>
							{isIncluded && isByPiece && (
								<Box style={{ width: '140px' }}>
									<Text color="neutral.700" style={{ marginBottom: '4px' }}>
										{t('General.quantity')}
									</Text>
									<FormControl name={quantityFieldName as any}>
										<NumericInput
											placeholder={t('General.quantityPlaceholder')}
											allowNegative={false}
											decimalScale={0}
										/>
									</FormControl>
								</Box>
							)}
						</Stack>
					</Inline>
				</Box>
				<Box display="flex" alignItems="flex-end" style={{ minHeight: '100px' }}>
					<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
						{displayPrice.toFixed(3)}€
					</Text>
				</Box>
			</Inline>
		</Box>
	)
}
