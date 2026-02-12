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
import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'
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

	// Wrapper functions that include acquisition type
	const setWizardStepWithType = (step: number) => {
		// Check if current step is valid before allowing navigation
		if (!isValid()) {
			return
		}
		setWizardStep(step, acquisitionType)
	}
	// Function for top navigation that bypasses validation
	const handleStepNavigation = (step: number) => {
		setWizardStep(step, acquisitionType)
	}
	const setCustomerIdWithType = (id: string) => setCustomerId(id, acquisitionType)
	const clearWizardWithType = () => clearWizard(acquisitionType)
	const { data: session } = useSession()
	const TOTAL_STEPS = isAdmin ? 5 : 4

	// Track Step3 form validation state
	const [step3FormValid, setStep3FormValid] = useState(true)

	// Determine user role for step title/description logic
	const userRole = session?.user?.roles[0]?.name
	const isService = hasRoleAccess(userRole, [UserRoleEnum.SERVICE])
	const isClient = hasRoleAccess(userRole, [UserRoleEnum.CLIENT])

	useNavbarItems({ title: isRent ? 'Orders.addRent' : 'Orders.addBuy', backLabel: 'General.back' })
	useSteps({ totalSteps: TOTAL_STEPS, currentStep })

	// Auto-populate client ID for non-admin users
	useEffect(() => {
		if (!isAdmin && session?.user?.userId && !customerId) {
			setCustomerIdWithType(session.user.userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, session?.user?.userId, acquisitionType])

	// Set acquisition type when component mounts or changes
	useEffect(() => {
		setAcquisitionType(acquisitionType)
	}, [acquisitionType, setAcquisitionType])

	useEffect(() => {
		setCurrentStep(currentStep)
	}, [currentStep, setCurrentStep])

	useEffect(() => {
		if (currentStep < 1 || currentStep > TOTAL_STEPS) {
			setWizardStepWithType(1)
		}
	}, [currentStep])

	const handleNext = () => {
		if (currentStep < TOTAL_STEPS) {
			setWizardStepWithType(currentStep + 1)
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			// Always allow going back, bypass validation
			setWizardStep(currentStep - 1, acquisitionType)
		}
	}

	const onSubmit = async () => {
		// Check if all steps are valid before submitting
		if (!isValid()) {
			return
		}

		if (!step1Data || !step4Data) {
			return
		}

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
				.map(p => ({
					productId: p.productId,
					quantity: Number(p.quantity) || 0
				})) as OrderProduct[],
			services: (step2Data?.services || [])
				.filter(s => {
					let isDefault = false
					selectedItems.forEach((product: Product) => {
						if (product.servicePrices && product.servicePrices.length > 0) {
							const service = product.servicePrices.find(
								svc => (svc.id && svc.id === s.serviceId) || (svc.serviceId && svc.serviceId === s.serviceId)
							)
							if (service) {
								isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
								if (isDefault) return
							}
						}
					})
					return s.isIncluded || isDefault
				})
				.map(s => {
					// Convert productQuantities to quantityByProduct format
					const quantityByProduct = s.productQuantities
						? Object.entries(s.productQuantities)
								.filter(([_, quantity]) => quantity > 0)
								.map(([productId, quantity]) => ({
									productId,
									quantity: Number(quantity) || 0
								}))
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

					// Convert productQuantities to quantityByProduct format, including fileId if available
					const quantityByProductMap = new Map<string, { productId: string; quantity: number; fileId?: string }>()

					// Add entries from productQuantities
					if (ac.productQuantities) {
						Object.entries(ac.productQuantities)
							.filter(([_, quantity]) => quantity > 0)
							.forEach(([productId, quantity]) => {
								quantityByProductMap.set(productId, {
									productId,
									quantity: Number(quantity) || 0,
									fileId: ac.productFileIds?.[productId] || undefined
								})
							})
					}

					// If enableUpload is true, add entries for products with fileId but no quantity entry
					if (hasFileUpload && ac.productFileIds) {
						Object.entries(ac.productFileIds)
							.filter(([_, fileId]) => fileId && fileId !== '')
							.forEach(([productId, fileId]) => {
								// Only add if not already in the map (from productQuantities)
								if (!quantityByProductMap.has(productId)) {
									quantityByProductMap.set(productId, {
										productId,
										quantity: 1,
										fileId: fileId
									})
								} else {
									// Update existing entry to include fileId
									const existing = quantityByProductMap.get(productId)!
									quantityByProductMap.set(productId, {
										...existing,
										fileId: fileId
									})
								}
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

		// Check if current step is valid before proceeding
		if (!isValid()) {
			return
		}

		if (currentStep === TOTAL_STEPS) {
			onSubmit()
		} else {
			handleNext()
		}
	}

	// Validation check - each step component handles its own validation
	// We'll check if required data exists for the current step
	const isValid = () => {
		// Combine all products for validation
		const allProductsForValidation = [...allProducts, ...myProducts]
		const { isValid: productsValid } = validateOrderProducts(step1Data, allProductsForValidation, selectedItems)

		if (isAdmin) {
			switch (currentStep) {
				case 1:
					// Step 1: Client selection (admin only)
					return !!customerId
				case 2:
					// Step 2: Products
					return productsValid
				case 3:
					return true // Services are optional
				case 4:
					// Step 4: Additional costs - check form validation
					return step3FormValid
				case 5:
					return !!(step4Data?.place && step4Data?.street && customerId && productsValid)
				default:
					return false
			}
		} else {
			switch (currentStep) {
				case 1:
					// Step 1: Products (non-admin)
					return productsValid
				case 2:
					return true // Services are optional
				case 3:
					// Step 3: Additional costs - check form validation
					return step3FormValid
				case 4:
					return !!(step4Data?.place && step4Data?.street && customerId && productsValid)
				default:
					return false
			}
		}
	}

	// Determine step title and description keys based on user role
	const stepTitleKey =
		isAdmin && currentStep === 1
			? undefined // Client selection step has no title
			: isAdmin && currentStep > 1
				? `Orders.step${currentStep - 1}Title`
				: isService || isClient
					? `Orders.step${currentStep}Title`
					: undefined

	const stepDescriptionKey =
		isAdmin && currentStep === 1
			? undefined // Client selection step has no description
			: isAdmin && currentStep > 1
				? `Orders.step${currentStep - 1}Description`
				: isService || isClient
					? `Orders.step${currentStep}Description`
					: undefined

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
							{((isAdmin && currentStep === 2) || (!isAdmin && currentStep === 1)) && (
								<Step1Products
									products={allProducts || []}
									myProducts={myProducts || []}
									selectedItems={selectedItems}
									acquisitionType={acquisitionType}
								/>
							)}
							{((isAdmin && currentStep === 3) || (!isAdmin && currentStep === 2)) && (
								<Step2Services
									products={selectedItems}
									acquisitionType={acquisitionType}
									serviceLocations={serviceLocations}
								/>
							)}
							{((isAdmin && currentStep === 4) || (!isAdmin && currentStep === 3)) && (
								<Step3AdditionalCosts
									additionalCosts={additionalCosts}
									acquisitionType={acquisitionType}
									products={selectedItems}
									onValidationChange={setStep3FormValid}
								/>
							)}
							{((isAdmin && currentStep === 5) || (!isAdmin && currentStep === 4)) && (
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
