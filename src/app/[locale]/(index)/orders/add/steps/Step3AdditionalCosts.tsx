'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo, useRef } from 'react'

import { Stack } from '@/components/layout/stack'
import { AdditionalCostListItem } from '@/components/custom/additional-cost-card'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { useOrderWizardStore, Step3AdditionalCostsData } from '@/store/order-wizard'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Product } from 'api/models/products/product'
import { Order } from 'api/models/order/order'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { AdditionalCostCalculationTypeEnum } from 'enums/additionalCostCalculationTypeEnum'

const createAdditionalCostSchema = (additionalCosts: AdditionalCosts[]) => {
	return z
		.object({
			additionalCostId: z.string().optional(),
			isIncluded: z.boolean().default(false),
			quantity: z.coerce.number().min(0).default(0),
			productQuantities: z.record(z.string(), z.coerce.number().min(0)).optional(),
			productFileIds: z.record(z.string(), z.string()).optional(),
			productFileInfos: z
				.record(z.string(), z.object({ id: z.string(), name: z.string().optional(), url: z.string().optional() }))
				.optional()
		})
		.superRefine((data, ctx) => {
			if (!data.isIncluded) return

			if (!data.additionalCostId || data.additionalCostId.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Additional cost ID is required',
					path: ['additionalCostId']
				})
				return
			}

			const additionalCost = additionalCosts.find(ac => ac.id === data.additionalCostId)
			if (!additionalCost) return

			const calculationType = additionalCost.calculationType
			const isOverall = calculationType === AdditionalCostCalculationTypeEnum.OVERALL
			const isByProduct = calculationType === AdditionalCostCalculationTypeEnum.BY_PRODUCT

			// Skip quantity validation if upload is enabled
			if (additionalCost.enableUpload) return

			// Only validate if calculation type exists and billing type is BY_PIECE
			if (!calculationType || additionalCost.billingType !== BillingTypeEnum.BY_PIECE) return

			// Validate overall calculation type
			if (isOverall) {
				if (data.quantity <= 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Quantity must be greater than 0',
						path: ['quantity']
					})
					return
				}

				if (additionalCost.maxPieces !== undefined && additionalCost.maxPieces !== null) {
					if (data.quantity > additionalCost.maxPieces) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Quantity cannot exceed max pieces',
							path: ['quantity']
						})
					}
				}
			}

			// Validate by_product calculation type
			if (isByProduct) {
				if (!data.productQuantities || Object.keys(data.productQuantities).length === 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'At least one product quantity must be greater than 0',
						path: ['productQuantities']
					})
					return
				}

				const hasValidQuantity = Object.values(data.productQuantities).some(qty => (qty || 0) > 0)
				if (!hasValidQuantity) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'At least one product quantity must be greater than 0',
						path: ['productQuantities']
					})
					return
				}

				if (additionalCost.maxPieces !== undefined && additionalCost.maxPieces !== null) {
					Object.entries(data.productQuantities).forEach(([productId, qty]) => {
						if (qty > additionalCost.maxPieces!) {
							ctx.addIssue({
								code: z.ZodIssueCode.custom,
								message: `Product quantity cannot exceed max pieces (${additionalCost.maxPieces})`,
								path: ['productQuantities', productId]
							})
						}
					})
				}
			}
		})
}

const createStep3Schema = (additionalCosts: AdditionalCosts[]) => {
	return z.object({
		additionalCosts: z.array(createAdditionalCostSchema(additionalCosts)).optional().default([])
	})
}

type Step3Schema = z.infer<ReturnType<typeof createStep3Schema>>

interface Props {
	additionalCosts: AdditionalCosts[]
	acquisitionType: AcquisitionTypeEnum
	order?: Order
	products?: Product[]
	onValidationChange?: (isValid: boolean) => void
}

const filterUndefined = <T,>(obj: Record<string, T> | undefined): Record<string, T> | undefined => {
	if (!obj) return undefined
	const filtered = Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined && value !== ''))
	return Object.keys(filtered).length > 0 ? (filtered as Record<string, T>) : undefined
}

const filterProductQuantities = (
	obj: Record<string, number | undefined> | undefined
): Record<string, number> | undefined => {
	if (!obj) return undefined
	const filtered = Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined && typeof value === 'number')
	) as Record<string, number>
	return Object.keys(filtered).length > 0 ? filtered : undefined
}

export const Step3AdditionalCosts = ({
	additionalCosts,
	acquisitionType,
	order,
	products = [],
	onValidationChange
}: Props) => {
	const { getStep3Data, setStep3Data } = useOrderWizardStore()
	const step3Data = getStep3Data(acquisitionType)
	const isFirstCallback = useRef(true)

	const initialAdditionalCosts = useMemo(() => {
		if (step3Data?.additionalCosts) return step3Data.additionalCosts
		if (!additionalCosts || additionalCosts.length === 0) return []
		return additionalCosts.map((ac: AdditionalCosts) => ({
			additionalCostId: ac.id,
			isIncluded: false,
			quantity: 0
		}))
	}, [additionalCosts, step3Data])

	const step3Schema = useMemo(() => createStep3Schema(additionalCosts), [additionalCosts])

	const form = useForm<Step3Schema>({
		mode: 'onChange',
		resolver: zodResolver(step3Schema),
		defaultValues: { additionalCosts: initialAdditionalCosts }
	})

	// Validation tracking
	useEffect(() => {
		if (!onValidationChange) return

		const checkValidation = async () => {
			const currentValues = form.getValues()
			const allNotIncluded = !currentValues.additionalCosts || currentValues.additionalCosts.every(ac => !ac.isIncluded)

			if (allNotIncluded) {
				onValidationChange(true)
				return
			}

			// Check if any included additional cost has enableUpload - if so, always allow next
			const hasEnableUpload = currentValues.additionalCosts?.some(ac => {
				if (!ac.isIncluded || !ac.additionalCostId) return false
				const additionalCost = additionalCosts.find(acc => acc.id === ac.additionalCostId)
				return additionalCost?.enableUpload === true
			})

			if (hasEnableUpload) {
				onValidationChange(true)
				return
			}

			await form.trigger()
			onValidationChange(form.formState.isValid)
		}

		checkValidation()

		const subscription = form.watch(() => {
			setTimeout(() => {
				const currentValues = form.getValues()
				const allNotIncluded =
					!currentValues.additionalCosts || currentValues.additionalCosts.every(ac => !ac.isIncluded)

				if (allNotIncluded) {
					onValidationChange(true)
					return
				}

				// Check if any included additional cost has enableUpload - if so, always allow next
				const hasEnableUpload = currentValues.additionalCosts?.some(ac => {
					if (!ac.isIncluded || !ac.additionalCostId) return false
					const additionalCost = additionalCosts.find(acc => acc.id === ac.additionalCostId)
					return additionalCost?.enableUpload === true
				})

				if (hasEnableUpload) {
					onValidationChange(true)
					return
				}

				form.trigger().then(() => {
					onValidationChange(form.formState.isValid)
				})
			}, 0)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onValidationChange, form, additionalCosts])

	// Save to store
	useEffect(() => {
		const subscription = form.watch(data => {
			const stepData: Step3AdditionalCostsData = {
				additionalCosts:
					data.additionalCosts?.map(ac => ({
						additionalCostId: ac?.additionalCostId || '',
						isIncluded: ac?.isIncluded || false,
						quantity: ac?.quantity || 0,
						productQuantities: filterProductQuantities(ac?.productQuantities),
						productFileIds: filterUndefined(ac?.productFileIds) as Record<string, string> | undefined,
						productFileInfos: filterUndefined(ac?.productFileInfos) as
							| Record<string, { id: string; name?: string; url?: string }>
							| undefined
					})) || []
			}

			if (isFirstCallback.current) {
				isFirstCallback.current = false
			}
			setStep3Data(stepData, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

	return (
		<FormProvider {...form}>
			<Stack gap={0}>
				{additionalCosts?.map((additionalCost: AdditionalCosts, index: number) => {
					const originalIndex = additionalCosts?.findIndex(ac => ac.id === additionalCost.id) ?? index
					return (
						<AdditionalCostListItem
							key={additionalCost.id}
							additionalCost={additionalCost}
							index={originalIndex}
							isEditMode={!!order}
							orderStatus={order?.status}
							products={products}
						/>
					)
				})}
			</Stack>
		</FormProvider>
	)
}
