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
			// Skip validation if not included - this step is optional
			if (!data.isIncluded) {
				return
			}

			// Only require additionalCostId when isIncluded is true
			if (!data.additionalCostId || data.additionalCostId.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Additional cost ID is required',
					path: ['additionalCostId']
				})
				return
			}

			const additionalCost = additionalCosts.find(ac => ac.id === data.additionalCostId)

			if (!additionalCost) {
				return
			}

			// Only validate maxPieces for BY_PIECE billing type
			if (additionalCost.billingType !== BillingTypeEnum.BY_PIECE) {
				return
			}

			// For BY_PIECE, quantity must be greater than 0 if included
			if (data.quantity <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Quantity must be greater than 0',
					path: ['quantity']
				})
				return
			}

			// If maxPieces is defined, validate against it
			if (additionalCost.maxPieces !== undefined && additionalCost.maxPieces !== null) {
				if (data.quantity > additionalCost.maxPieces) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Quantity cannot exceed max pieces',
						path: ['quantity']
					})
				}
			}
		})
}

const createStep3Schema = (additionalCosts: AdditionalCosts[]) => {
	const additionalCostSchema = createAdditionalCostSchema(additionalCosts)
	return z.object({
		additionalCosts: z.array(additionalCostSchema).optional().default([])
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

export const Step3AdditionalCosts = ({
	additionalCosts,
	acquisitionType,
	order,
	products = [],
	onValidationChange
}: Props) => {
	const { getStep3Data, setStep3Data } = useOrderWizardStore()
	const step3Data = getStep3Data(acquisitionType)

	// Track if this is the first callback to skip initial calculation
	const isFirstCallback = useRef(true)

	// Initialize additional costs
	const initialAdditionalCosts = useMemo(() => {
		if (step3Data?.additionalCosts) {
			return step3Data.additionalCosts
		}

		if (!additionalCosts || additionalCosts.length === 0) {
			return []
		}

		return additionalCosts.map((additionalCost: AdditionalCosts) => ({
			additionalCostId: additionalCost.id,
			isIncluded: false,
			quantity: 0
		}))
	}, [additionalCosts, step3Data])

	const step3Schema = useMemo(() => createStep3Schema(additionalCosts), [additionalCosts])

	const form = useForm<Step3Schema>({
		mode: 'onChange',
		resolver: zodResolver(step3Schema),
		defaultValues: {
			additionalCosts: initialAdditionalCosts
		}
	})

	// Watch form validation state and notify parent
	useEffect(() => {
		if (!onValidationChange) return

		// Initial validation check - ensure form is valid when all items are not included
		const checkValidation = async () => {
			// Check if all items are not included - if so, form is always valid
			const currentValues = form.getValues()
			const allNotIncluded = !currentValues.additionalCosts || currentValues.additionalCosts.every(ac => !ac.isIncluded)

			if (allNotIncluded) {
				onValidationChange(true)
				return
			}

			await form.trigger()
			onValidationChange(form.formState.isValid)
		}

		// Trigger validation when step becomes active to ensure errors are shown
		checkValidation()

		// Subscribe to form state changes to track validation
		const subscription = form.watch(() => {
			// Use setTimeout to ensure validation has completed
			setTimeout(() => {
				const currentValues = form.getValues()
				const allNotIncluded =
					!currentValues.additionalCosts || currentValues.additionalCosts.every(ac => !ac.isIncluded)

				if (allNotIncluded) {
					onValidationChange(true)
					return
				}

				form.trigger().then(() => {
					onValidationChange(form.formState.isValid)
				})
			}, 0)
		})

		return () => {
			subscription.unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onValidationChange, form])

	// Save to store when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			// Skip calculation on first callback (when navigating to step)
			if (isFirstCallback.current) {
				isFirstCallback.current = false
				const stepData: Step3AdditionalCostsData = {
					additionalCosts:
						data.additionalCosts?.map(ac => {
							const productQuantities = ac?.productQuantities
								? (Object.fromEntries(
										Object.entries(ac.productQuantities).filter(([_, value]) => value !== undefined)
									) as Record<string, number>)
								: undefined

							const productFileIds = ac?.productFileIds
								? (Object.fromEntries(
										Object.entries(ac.productFileIds).filter(([_, value]) => value !== undefined && value !== '')
									) as Record<string, string>)
								: undefined

							const productFileInfos = ac?.productFileInfos
								? (Object.fromEntries(
										Object.entries(ac.productFileInfos).filter(([_, value]) => value !== undefined)
									) as Record<string, { id: string; name?: string; url?: string }>)
								: undefined

							return {
								additionalCostId: ac?.additionalCostId || '',
								isIncluded: ac?.isIncluded || false,
								quantity: ac?.quantity || 0,
								productQuantities,
								productFileIds,
								productFileInfos
							}
						}) || []
				}
				setStep3Data(stepData, acquisitionType)
				return
			}
			const stepData: Step3AdditionalCostsData = {
				additionalCosts:
					data.additionalCosts?.map(ac => {
						// Filter out undefined values from productQuantities
						const productQuantities = ac?.productQuantities
							? (Object.fromEntries(
									Object.entries(ac.productQuantities).filter(([_, value]) => value !== undefined)
								) as Record<string, number>)
							: undefined

						const productFileIds = ac?.productFileIds
							? (Object.fromEntries(
									Object.entries(ac.productFileIds).filter(([_, value]) => value !== undefined && value !== '')
								) as Record<string, string>)
							: undefined

						const productFileInfos = ac?.productFileInfos
							? (Object.fromEntries(
									Object.entries(ac.productFileInfos).filter(([_, value]) => value !== undefined)
								) as Record<string, { id: string; name?: string; url?: string }>)
							: undefined

						return {
							additionalCostId: ac?.additionalCostId || '',
							isIncluded: ac?.isIncluded || false,
							quantity: ac?.quantity || 0,
							productQuantities,
							productFileIds,
							productFileInfos
						}
					}) || []
			}
			setStep3Data(stepData, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

	const visibleAdditionalCosts = additionalCosts

	return (
		<FormProvider {...form}>
			<Stack gap={0}>
				{visibleAdditionalCosts?.map((additionalCost: AdditionalCosts, index: number) => {
					const originalIndex = additionalCosts?.findIndex(ac => ac.id === additionalCost.id) ?? index
					return (
						<AdditionalCostListItem
							acquisitionType={acquisitionType}
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
