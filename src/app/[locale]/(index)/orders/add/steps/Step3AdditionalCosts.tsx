'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { AdditionalCostListItem } from '@/components/custom/additional-cost-card'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { useOrderWizardStore, Step3AdditionalCostsData } from '@/store/order-wizard'
import { BillingTypeEnum } from 'enums/billingTypeEnum'

const additionalCostSchema = z.object({
	additionalCostId: z.string(),
	isIncluded: z.boolean().default(false),
	quantity: z.coerce.number().min(0).default(0),
	price: z.coerce.number().min(0).default(0)
})

const step3Schema = z.object({
	additionalCosts: z.array(additionalCostSchema).optional().default([])
})

type Step3Schema = z.infer<typeof step3Schema>

interface Props {
	additionalCosts: AdditionalCosts[]
}

export const Step3AdditionalCosts = ({ additionalCosts }: Props) => {
	const t = useTranslations()
	const { step3Data, setStep3Data, setTotalAmount, step1Data, step2Data } = useOrderWizardStore()

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
	}, [formAdditionalCosts.map(ac => `${ac.additionalCostId}-${ac.isIncluded}-${ac.quantity}`).join(',')])

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const additionalCostsTotal = (data.additionalCosts || []).reduce(
				(sum, additionalCost) => sum + (additionalCost?.isIncluded ? additionalCost?.price || 0 : 0),
				0
			)

			const stepData: Step3AdditionalCostsData = {
				additionalCosts:
					data.additionalCosts?.map(ac => ({
						additionalCostId: ac?.additionalCostId || '',
						isIncluded: ac?.isIncluded || false,
						quantity: ac?.quantity || 0,
						price: ac?.price || 0
					})) || []
			}
			setStep3Data(stepData)

			// Update total amount (combine all steps)
			const step1Total = step1Data?.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
			const step2Total =
				step2Data?.services?.reduce((sum, s) => {
					return sum + (s.isIncluded ? s.price || 0 : 0)
				}, 0) || 0
			setTotalAmount(step1Total + step2Total + additionalCostsTotal)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, step1Data, step2Data])

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
							isEditMode={false}
						/>
					)
				})}
			</Stack>
		</FormProvider>
	)
}
