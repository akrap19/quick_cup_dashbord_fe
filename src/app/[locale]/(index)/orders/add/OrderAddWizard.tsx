'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useEffect } from 'react'

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
import { applyDiscount } from '@/utils/discount'

interface Props {
	isAdmin: boolean
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Event[]
	additionalCosts: AdditionalCosts[]
	allProducts?: Product[]
	serviceLocations?: Base[]
}

export const OrderAddWizard = ({
	isAdmin,
	acquisitionType,
	clients,
	events,
	additionalCosts,
	allProducts = [],
	serviceLocations = []
}: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	const { navbarIsLoading } = useNavbarItemsStore()
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
		getTotalAmount,
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
	const totalAmount = getTotalAmount(acquisitionType)

	// Wrapper functions that include acquisition type
	const setWizardStepWithType = (step: number) => setWizardStep(step, acquisitionType)
	const setCustomerIdWithType = (id: string) => setCustomerId(id, acquisitionType)
	const clearWizardWithType = () => clearWizard(acquisitionType)
	const { data: session } = useSession()
	const TOTAL_STEPS = isAdmin ? 5 : 4

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
			setWizardStepWithType(currentStep - 1)
		}
	}

	const onSubmit = async () => {
		if (!step1Data || !step4Data) {
			return
		}

		const discount = step4Data.discount

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
					quantity: Number(p.quantity) || 0,
					price: applyDiscount(Number(p.price) || 0, discount)
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
						price: applyDiscount(Number(s.price) || 0, discount),
						serviceLocationId: s.serviceLocationId,
						quantityByProduct: quantityByProduct.length > 0 ? quantityByProduct : undefined
					}
				}),
			additionalCosts: (step3Data?.additionalCosts || [])
				.filter(ac => ac.isIncluded)
				.map(ac => {
					const additionalCost = additionalCosts.find(acc => acc.id === ac.additionalCostId)
					const isOneTime = additionalCost?.billingType === BillingTypeEnum.ONE_TIME

					// Convert productQuantities to quantityByProduct format
					const quantityByProduct = ac.productQuantities
						? Object.entries(ac.productQuantities)
								.filter(([_, quantity]) => quantity > 0)
								.map(([productId, quantity]) => ({
									productId,
									quantity: Number(quantity) || 0
								}))
						: []

					return {
						additionalCostId: ac.additionalCostId,
						quantity: isOneTime ? 1 : Number(ac.quantity) || 0,
						price: applyDiscount(Number(ac.price) || 0, discount),
						quantityByProduct: quantityByProduct.length > 0 ? quantityByProduct : undefined
					}
				}),
			totalAmount: totalAmount,
			notes: step4Data.notes?.trim() ? step4Data.notes.trim() : null,
			discount: step4Data.discount?.toString() === '' ? undefined : step4Data.discount
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
		}
	}

	const handleStepSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (currentStep === TOTAL_STEPS) {
			onSubmit()
		} else {
			handleNext()
		}
	}

	const totalAmountLabel = totalAmount === 0 ? '0' : totalAmount.toFixed(3)
	const totalAmountDisplay = t('Orders.totalAmount') + ': ' + totalAmountLabel + '€'

	// Validation check - each step component handles its own validation
	// We'll check if required data exists for the current step
	const isValid = () => {
		const { isValid: productsValid } = validateOrderProducts(step1Data, allProducts, selectedItems)

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
					return true // Additional costs are optional
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
					return true // Additional costs are optional
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
						onStepClick={setWizardStepWithType}
						stepTitleKey={stepTitleKey}
						stepDescriptionKey={stepDescriptionKey}>
						<Stack gap={6}>
							{isAdmin && currentStep === 1 && (
								<Step1ClientSelection customers={clients} acquisitionType={acquisitionType} />
							)}
							{((isAdmin && currentStep === 2) || (!isAdmin && currentStep === 1)) && (
								<Step1Products
									products={allProducts || []}
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
						totalAmountLabel={totalAmountDisplay}
						onBack={() => cancelDialog.toggleOpened()}
						onPrevious={handleBack}
						isValid={isValid()}
					/>
				</form>
			)}
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={{}} />
		</>
	)
}
