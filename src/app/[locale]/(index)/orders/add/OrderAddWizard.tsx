'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useEffect, useState } from 'react'

import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useNavbarItemsStore } from '@/store/navbar'
import { useOpened } from '@/hooks/use-toggle'
import { useSteps } from '@/hooks/use-steps'
import { Loader } from '@/components/custom/loader/Loader'
import { OrderPayload } from 'api/models/order/orderPayload'
import { OrderProduct } from 'api/models/order/orderProduct'
import { createOrder } from 'api/services/orders'
import { ROUTES } from 'parameters'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Base } from 'api/models/common/base'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { Product } from 'api/models/products/product'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { Event } from 'api/models/event/event'
import { useStepsStore } from '@/store/steps'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useOrderWizardStore } from '@/store/order-wizard'

import { Step1ClientSelection } from './steps/Step1ClientSelection'
import { Step1Products } from './steps/Step1Products'
import { Step2Services } from './steps/Step2Services'
import { Step3AdditionalCosts } from './steps/Step3AdditionalCosts'
import { Step4OrderInformation } from './steps/Step4OrderInformation'
import { WizardFooter } from './WizardFooter'
import { Stack } from '@/components/layout/stack'
import { useSession } from 'next-auth/react'
import { validateOrderProducts } from 'utils/orderValidation'

interface Props {
	isAdmin: boolean
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Event[]
	additionalCosts: AdditionalCosts[]
	allProducts?: Product[]
	myProducts?: Product[]
	serviceLocations?: Base[]
}

export const OrderAddWizard = ({
	isAdmin,
	acquisitionType,
	clients,
	events,
	additionalCosts,
	allProducts = [],
	myProducts = [],
	serviceLocations = []
}: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	const { navbarIsLoading } = useNavbarItemsStore()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems, clearItems } = isRent ? rentStore : buyStore
	const { setCurrentStep } = useStepsStore()
	const {
		getCurrentStep,
		getStep1Data,
		getStep2Data,
		getStep3Data,
		getStep4Data,
		getCustomerId,
		setCurrentStep: setWizardStep,
		setCustomerId,
		clearWizard,
		setAcquisitionType
	} = useOrderWizardStore()

	// Get data for current acquisition type
	const currentStep = getCurrentStep(acquisitionType)
	const step1Data = getStep1Data(acquisitionType)
	const step2Data = getStep2Data(acquisitionType)
	const step3Data = getStep3Data(acquisitionType)
	const step4Data = getStep4Data(acquisitionType)
	const customerId = getCustomerId(acquisitionType)

	const setWizardStepWithType = (step: number) => {
		if (!isValid()) return
		setWizardStep(step, acquisitionType)
	}
	const handleStepNavigation = (step: number) => setWizardStep(step, acquisitionType)
	const setCustomerIdWithType = (id: string) => setCustomerId(id, acquisitionType)
	const clearWizardWithType = () => clearWizard(acquisitionType)
	const { data: session } = useSession()
	const TOTAL_STEPS = isAdmin ? 5 : 4

	// Track Step3 form validation state
	const [step3FormValid, setStep3FormValid] = useState(true)

	useNavbarItems({ title: isRent ? 'Orders.addRent' : 'Orders.addBuy', backLabel: 'General.back' })
	useSteps({ totalSteps: TOTAL_STEPS, currentStep })

	useEffect(() => {
		if (!isAdmin && session?.user?.userId && !customerId) {
			setCustomerIdWithType(session.user.userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, session?.user?.userId, acquisitionType])

	useEffect(() => {
		setAcquisitionType(acquisitionType)
	}, [acquisitionType, setAcquisitionType])

	useEffect(() => {
		setCurrentStep(currentStep)
	}, [currentStep, setCurrentStep])

	useEffect(() => {
		if (currentStep < 1 || currentStep > TOTAL_STEPS) {
			setWizardStep(1, acquisitionType)
		}
	}, [currentStep, acquisitionType, setWizardStep])

	const handleNext = () => {
		if (currentStep < TOTAL_STEPS) setWizardStepWithType(currentStep + 1)
	}

	const handleBack = () => {
		if (currentStep > 1) setWizardStep(currentStep - 1, acquisitionType)
	}

	const onSubmit = async () => {
		if (!isValid() || !step1Data || !step4Data) return
		setIsSubmitting(true)

		const payload: OrderPayload = {
			acquisitionType: step4Data.acquisitionType || acquisitionType,
			customerId: customerId!,
			eventId: step4Data.eventId,
			location: step4Data.location?.trim(),
			place: step4Data.place!.trim(),
			street: step4Data.street!.trim(),
			contactPerson: step4Data.contactPerson?.trim(),
			contactPersonContact: step4Data.contactPersonContact?.trim(),
			products: step1Data.products
				.filter(p => Number(p.quantity) > 0)
				.map(p => ({ productId: p.productId, quantity: Number(p.quantity) || 0 })) as OrderProduct[],
			services: (step2Data?.services || [])
				.filter(s => {
					const isDefault = selectedItems.some((product: Product) =>
						product.servicePrices?.some(
							svc =>
								((svc.id === s.serviceId || svc.serviceId === s.serviceId) &&
									(isRent ? svc.isDefaultServiceForRent : svc.isDefaultServiceForBuy)) ||
								false
						)
					)
					return s.isIncluded || isDefault
				})
				.map(s => {
					const quantityByProduct = s.productQuantities
						? Object.entries(s.productQuantities)
								.filter(([_, q]) => q > 0)
								.map(([productId, q]) => ({ productId, quantity: Number(q) || 0 }))
						: []

					return {
						serviceId: s.serviceId,
						quantity: Number(s.quantity) || 0,
						serviceLocationId: s.serviceLocationId,
						quantityByProduct: quantityByProduct.length > 0 ? quantityByProduct : undefined
					}
				}),
			additionalCosts: (step3Data?.additionalCosts || [])
				.filter(ac => ac.isIncluded)
				.map(ac => {
					const additionalCost = additionalCosts.find(acc => acc.id === ac.additionalCostId)
					const isOneTime = additionalCost?.billingType === BillingTypeEnum.ONE_TIME
					const hasFileUpload = additionalCost?.enableUpload
					const quantityByProductMap = new Map<string, { productId: string; quantity: number; fileId?: string }>()

					// Add entries from productQuantities
					if (ac.productQuantities) {
						Object.entries(ac.productQuantities)
							.filter(([_, q]) => q > 0)
							.forEach(([productId, q]) => {
								quantityByProductMap.set(productId, {
									productId,
									quantity: Number(q) || 0,
									fileId: ac.productFileIds?.[productId]
								})
							})
					}

					// Add entries for products with fileId but no quantity entry
					if (hasFileUpload && ac.productFileIds) {
						Object.entries(ac.productFileIds)
							.filter(([_, fileId]) => fileId)
							.forEach(([productId, fileId]) => {
								const existing = quantityByProductMap.get(productId)
								quantityByProductMap.set(productId, {
									productId,
									quantity: existing?.quantity || 1,
									fileId: fileId
								})
							})
					}

					const quantityByProduct = Array.from(quantityByProductMap.values())

					return {
						additionalCostId: ac.additionalCostId,
						quantity: isOneTime ? 1 : Number(ac.quantity) || 0,
						quantityByProduct: quantityByProduct.length > 0 ? quantityByProduct : undefined
					}
				}),
			notes: step4Data.notes?.trim() ? step4Data.notes.trim() : null
		}

		const result = await createOrder(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyCreated'))

			setTimeout(() => {
				clearWizardWithType()
				clearItems()
			}, 2500)
			push(ROUTES.ORDERS)
			refresh()
		} else {
			setIsSubmitting(false)
		}
	}

	const handleStepSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!isValid()) return
		currentStep === TOTAL_STEPS ? onSubmit() : handleNext()
	}

	const isValid = () => {
		const allProductsForValidation = [...allProducts, ...myProducts]
		const { isValid: productsValid } = validateOrderProducts(step1Data, allProductsForValidation, selectedItems)
		const normalizedStep = isAdmin ? currentStep : currentStep + 1

		switch (normalizedStep) {
			case 1:
				return isAdmin ? !!customerId : productsValid
			case 2:
				return productsValid
			case 3:
				return true // Services are optional
			case 4:
				return step3FormValid
			case 5:
				return !!(step4Data?.place && step4Data?.street && customerId && productsValid)
			default:
				return false
		}
	}

	const getStepNumber = () => (isAdmin && currentStep > 1 ? currentStep - 1 : currentStep)
	const stepTitleKey = isAdmin && currentStep === 1 ? undefined : `Orders.step${getStepNumber()}Title`
	const stepDescriptionKey = isAdmin && currentStep === 1 ? undefined : `Orders.step${getStepNumber()}Description`

	return (
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<form onSubmit={handleStepSubmit} style={{ flex: 1 }}>
					<ManageJourneyWrapper
						onStepClick={handleStepNavigation}
						stepTitleKey={stepTitleKey}
						stepDescriptionKey={stepDescriptionKey}>
						<Stack gap={6}>
							{isAdmin && currentStep === 1 && (
								<Step1ClientSelection customers={clients} acquisitionType={acquisitionType} />
							)}
							{(isAdmin ? currentStep === 2 : currentStep === 1) && (
								<Step1Products
									products={allProducts || []}
									myProducts={myProducts || []}
									selectedItems={selectedItems}
									acquisitionType={acquisitionType}
								/>
							)}
							{(isAdmin ? currentStep === 3 : currentStep === 2) && (
								<Step2Services
									products={selectedItems}
									acquisitionType={acquisitionType}
									serviceLocations={serviceLocations}
								/>
							)}
							{(isAdmin ? currentStep === 4 : currentStep === 3) && (
								<Step3AdditionalCosts
									additionalCosts={additionalCosts}
									acquisitionType={acquisitionType}
									products={selectedItems}
									onValidationChange={setStep3FormValid}
								/>
							)}
							{(isAdmin ? currentStep === 5 : currentStep === 4) && (
								<Step4OrderInformation events={events} acquisitionType={acquisitionType} isAdmin={isAdmin} />
							)}
						</Stack>
					</ManageJourneyWrapper>
					<WizardFooter
						currentStep={currentStep}
						totalSteps={TOTAL_STEPS}
						onBack={() => cancelDialog.toggleOpened()}
						onPrevious={handleBack}
						isValid={isValid()}
						isSubmitting={isSubmitting}
					/>
				</form>
			)}
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={{}} />
		</>
	)
}
