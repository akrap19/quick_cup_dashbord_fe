'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'

import { Stack } from '@/components/layout/stack'
import { AdditionalCostListItem } from '@/components/custom/additional-cost-card'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { useOrderWizardStore, Step3AdditionalCostsData } from '@/store/order-wizard'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Product } from 'api/models/products/product'
import { Order } from 'api/models/order/order'

const additionalCostSchema = z.object({
	additionalCostId: z.string(),
	isIncluded: z.boolean().default(false),
	quantity: z.coerce.number().min(0).default(0),
	price: z.coerce.number().min(0).default(0),
	productQuantities: z.record(z.string(), z.coerce.number().min(0)).optional()
})

const step3Schema = z.object({
	additionalCosts: z.array(additionalCostSchema).optional().default([])
})

type Step3Schema = z.infer<typeof step3Schema>

interface Props {
	additionalCosts: AdditionalCosts[]
	acquisitionType: AcquisitionTypeEnum
	order?: Order
	products?: Product[]
}

export const Step3AdditionalCosts = ({ additionalCosts, acquisitionType, order, products = [] }: Props) => {
	const { getStep3Data, getStep1Data, getStep2Data, setStep3Data, setTotalAmount } = useOrderWizardStore()
	const step3Data = getStep3Data(acquisitionType)
	const step1Data = getStep1Data(acquisitionType)
	const step2Data = getStep2Data(acquisitionType)

	// Initialize additional costs
	const initialAdditionalCosts = useMemo(() => {
		if (step3Data?.additionalCosts) {
			return step3Data.additionalCosts
		}

		return additionalCosts?.map((additionalCost: AdditionalCosts) => ({
			additionalCostId: additionalCost.id,
			isIncluded: false,
			quantity: 0,
			price: 0
		}))
	}, [additionalCosts, step3Data])

	const form = useForm<Step3Schema>({
		mode: 'onChange',
		resolver: zodResolver(step3Schema),
		defaultValues: {
			additionalCosts: initialAdditionalCosts
		}
	})

	const formAdditionalCosts = useWatch({ control: form.control, name: 'additionalCosts' }) || []

	// Calculate prices based on quantity and isIncluded
	useEffect(() => {
		formAdditionalCosts.forEach((formCost, index) => {
			const additionalCost = additionalCosts.find(ac => ac.id === formCost.additionalCostId)
			if (!additionalCost) return

			if (!formCost.isIncluded) {
				const currentPrice = form.getValues(`additionalCosts.${index}.price`)
				if (currentPrice !== 0) {
					form.setValue(`additionalCosts.${index}.price`, 0, { shouldValidate: false, shouldDirty: false })
				}
				if (additionalCost.billingType === BillingTypeEnum.BY_PIECE) {
					form.setValue(`additionalCosts.${index}.quantity`, 0, { shouldValidate: false, shouldDirty: false })
				}
				return
			}

			if (additionalCost.billingType === BillingTypeEnum.BY_PIECE) {
				// Use quantity field directly (it will be updated by AdditionalCostListItem if productQuantities exist)
				const quantity = Number(formCost.quantity) || 0

				if (quantity > 0) {
					const calculatedPrice = Number.parseFloat((additionalCost.price * quantity).toFixed(3))
					const currentPrice = form.getValues(`additionalCosts.${index}.price`)
					if (currentPrice !== calculatedPrice) {
						form.setValue(`additionalCosts.${index}.price`, calculatedPrice, {
							shouldValidate: false,
							shouldDirty: false
						})
					}
				} else {
					const currentPrice = form.getValues(`additionalCosts.${index}.price`)
					if (currentPrice !== 0) {
						form.setValue(`additionalCosts.${index}.price`, 0, { shouldValidate: false, shouldDirty: false })
					}
				}
			} else {
				// ONE_TIME billing
				const currentPrice = form.getValues(`additionalCosts.${index}.price`)
				if (currentPrice !== additionalCost.price) {
					form.setValue(`additionalCosts.${index}.price`, additionalCost.price, {
						shouldValidate: false,
						shouldDirty: false
					})
				}
				const currentQuantity = form.getValues(`additionalCosts.${index}.quantity`)
				if (currentQuantity !== 1) {
					form.setValue(`additionalCosts.${index}.quantity`, 1, { shouldValidate: false, shouldDirty: false })
				}
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		formAdditionalCosts
			.map(ac => `${ac.additionalCostId}-${ac.isIncluded}-${ac.quantity}-${JSON.stringify(ac.productQuantities || {})}`)
			.join(',')
	])

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const additionalCostsTotal = (data.additionalCosts || []).reduce(
				(sum, additionalCost) => sum + (additionalCost?.isIncluded ? additionalCost?.price || 0 : 0),
				0
			)

			const stepData: Step3AdditionalCostsData = {
				additionalCosts:
					data.additionalCosts?.map(ac => {
						// Filter out undefined values from productQuantities
						const productQuantities = ac?.productQuantities
							? (Object.fromEntries(
									Object.entries(ac.productQuantities).filter(([_, value]) => value !== undefined)
								) as Record<string, number>)
							: undefined

						return {
							additionalCostId: ac?.additionalCostId || '',
							isIncluded: ac?.isIncluded || false,
							quantity: ac?.quantity || 0,
							price: ac?.price || 0,
							productQuantities
						}
					}) || []
			}
			setStep3Data(stepData, acquisitionType)

			// Update total amount (combine all steps)
			const step1Total = step1Data?.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
			const step2Total =
				step2Data?.services?.reduce((sum, s) => {
					return sum + (s.isIncluded ? s.price || 0 : 0)
				}, 0) || 0
			setTotalAmount(step1Total + step2Total + additionalCostsTotal, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, step1Data, step2Data, acquisitionType])

	const visibleAdditionalCosts = additionalCosts

	return (
		<FormProvider {...form}>
			<Stack gap={0}>
				{visibleAdditionalCosts?.map((additionalCost: AdditionalCosts, index: number) => {
					const originalIndex = additionalCosts?.findIndex(ac => ac.id === additionalCost.id) ?? index
					return (
						<AdditionalCostListItem
							key={additionalCost.id}
							additionalCost={additionalCost}
							index={originalIndex}
							isEditMode={!!order}
							orderStatus={order?.status}
							order={order}
							products={products}
						/>
					)
				})}
			</Stack>
		</FormProvider>
	)
}
