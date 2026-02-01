'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect } from 'react'
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
	const additionalCostIdFieldName = `additionalCosts.${index}.additionalCostId`

	const isIncluded = useWatch({ control: form.control, name: isIncludedFieldName }) || false
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
			if (!isByPiece) {
				form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
			}
			return
		}

		if (!isByPiece) {
			// For one_time billing, quantity should be 1
			const currentQuantity = form.getValues(quantityFieldName)
			if (currentQuantity !== 1) {
				form.setValue(quantityFieldName, 1, { shouldValidate: false, shouldDirty: false })
			}
		}

		if (!isIncluded && isByPiece) {
			form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece])

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
			</Inline>
		</Box>
	)
}
