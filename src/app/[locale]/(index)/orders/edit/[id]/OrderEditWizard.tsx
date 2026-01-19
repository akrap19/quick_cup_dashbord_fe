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
import { updateOrder } from 'api/services/orders'
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
import { useTableStore } from '@/store/table'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import {
	useOrderWizardStore,
	Step1ProductsData,
	Step2ServicesData,
	Step3AdditionalCostsData,
	Step4OrderInformationData
} from '@/store/order-wizard'
import { Order } from 'api/models/order/order'

import { Step1ClientSelection } from '../../add/steps/Step1ClientSelection'
import { Step1Products } from '../../add/steps/Step1Products'
import { Step2Services } from '../../add/steps/Step2Services'
import { Step3AdditionalCosts } from '../../add/steps/Step3AdditionalCosts'
import { Step4OrderInformation } from '../../add/steps/Step4OrderInformation'
import { WizardFooter } from '../../add/WizardFooter'
import { Stack } from '@/components/layout/stack'
import { useSession } from 'next-auth/react'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'
import { validateOrderProducts } from 'utils/orderValidation'
import { applyDiscount, reverseDiscount } from '@/utils/discount'

interface Props {
	isAdmin: boolean
	order: Order
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Event[]
	additionalCosts: AdditionalCosts[]
	allProducts?: Product[]
	serviceLocations?: Base[]
}

export const OrderEditWizard = ({
	isAdmin,
	order,
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
	const { navbarIsLoading, clearNavbarItems } = useNavbarItemsStore()
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems } = isRent ? rentStore : buyStore
	const { setCurrentStep, setTotalSteps } = useStepsStore()
	const { clearCheckedItems } = useTableStore()
	const {
		getCurrentStep,
		getStep1Data,
		getStep2Data,
		getStep3Data,
		getStep4Data,
		getCustomerId,
		getTotalAmount,
		setCurrentStep: setWizardStep,
		setStep1Data,
		setStep2Data,
		setStep3Data,
		setStep4Data,
		setCustomerId,
		setTotalAmount,
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
	const setStep1DataWithType = (data: Step1ProductsData) => setStep1Data(data, acquisitionType)
	const setStep2DataWithType = (data: Step2ServicesData) => setStep2Data(data, acquisitionType)
	const setStep3DataWithType = (data: Step3AdditionalCostsData) => setStep3Data(data, acquisitionType)
	const setStep4DataWithType = (data: Step4OrderInformationData) => setStep4Data(data, acquisitionType)
	const setCustomerIdWithType = (id: string) => setCustomerId(id, acquisitionType)
	const setTotalAmountWithType = (amount: number) => setTotalAmount(amount, acquisitionType)
	const { data: session } = useSession()
	const TOTAL_STEPS = isAdmin ? 5 : 4

	// Determine user role for step title/description logic
	const userRole = session?.user?.roles[0]?.name
	const isService = hasRoleAccess(userRole, [UserRoleEnum.SERVICE])
	const isClient = hasRoleAccess(userRole, [UserRoleEnum.CLIENT])

	const cleanupAllData = () => {
		buyStore.clearItems()
		rentStore.clearItems()
		clearWizard()

		setCurrentStep(undefined)
		setTotalSteps(undefined)
		clearNavbarItems()
		clearCheckedItems()
	}

	// Helper function to initialize services
	const initializeServices = (orderServices: any[], orderProducts: Product[], discount?: number) => {
		const orderServicesMap = new Map()
		orderServices.forEach((s: any) => {
			// Convert quantityByProduct to productQuantities format
			const productQuantities: Record<string, number> = {}
			if (s.quantityByProduct && Array.isArray(s.quantityByProduct)) {
				s.quantityByProduct.forEach((qbp: any) => {
					if (qbp.productId && qbp.quantity !== undefined) {
						productQuantities[qbp.productId] = Number(qbp.quantity) || 0
					}
				})
			}

			// Reverse discount to get original price
			const originalPrice = reverseDiscount(s.price || 0, discount)

			orderServicesMap.set(s.serviceId, {
				quantity: s.quantity || 0,
				price: originalPrice,
				serviceLocationId: s.serviceLocationId,
				productQuantities: Object.keys(productQuantities).length > 0 ? productQuantities : undefined
			})
		})

		const serviceMap = new Map<
			string,
			{
				serviceId: string
				isIncluded: boolean
				quantity: number
				price: number
				serviceLocationId?: string
				productQuantities?: Record<string, number>
			}
		>()

		orderProducts.forEach((product: Product) => {
			product.servicePrices?.forEach(service => {
				const serviceId = service.id || service.serviceId
				if (serviceId && !serviceMap.has(serviceId)) {
					const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
					const orderService = orderServicesMap.get(serviceId)
					serviceMap.set(serviceId, {
						serviceId,
						isIncluded: isDefault || !!orderService,
						quantity: orderService?.quantity || 0,
						price: orderService?.price || 0,
						serviceLocationId: orderService?.serviceLocationId,
						productQuantities: orderService?.productQuantities
					})
				}
			})
		})

		// Add services from order that aren't in products
		orderServices.forEach((s: any) => {
			if (s.serviceId && !serviceMap.has(s.serviceId)) {
				// Convert quantityByProduct to productQuantities format
				const productQuantities: Record<string, number> = {}
				if (s.quantityByProduct && Array.isArray(s.quantityByProduct)) {
					s.quantityByProduct.forEach((qbp: any) => {
						if (qbp.productId && qbp.quantity !== undefined) {
							productQuantities[qbp.productId] = Number(qbp.quantity) || 0
						}
					})
				}

				// Reverse discount to get original price
				const originalPrice = reverseDiscount(s.price || 0, discount)

				serviceMap.set(s.serviceId, {
					serviceId: s.serviceId,
					isIncluded: true,
					quantity: s.quantity || 0,
					price: originalPrice,
					serviceLocationId: s.serviceLocationId,
					productQuantities: Object.keys(productQuantities).length > 0 ? productQuantities : undefined
				})
			}
		})

		return Array.from(serviceMap.values())
	}

	// Initialize buy/rent store with products from order
	useEffect(() => {
		if (order?.products && allProducts.length > 0) {
			const productsToAdd = allProducts.filter(p => order.products!.some(op => op.productId === p.id))
			const store = isRent ? rentStore : buyStore
			store.clearItems()
			productsToAdd.forEach(product => store.addItem(product))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order?.products, allProducts, isRent])

	// Set acquisition type when component mounts or changes
	useEffect(() => {
		setAcquisitionType(acquisitionType)
	}, [acquisitionType, setAcquisitionType])

	// Initialize wizard store with order data
	useEffect(() => {
		const orderAcquisitionType = order?.acquisitionType || acquisitionType
		const discount = order?.discount

		if (order?.products?.length) {
			console.log('order?.products', order?.products)
			setStep1DataWithType({
				products: order.products.map(p => ({
					productId: p.productId,
					quantity: p.quantity,
					// Reverse discount to get original price
					price: reverseDiscount(p.price || 0, discount)
				}))
			})
		}

		if (allProducts.length && order?.products?.length) {
			const orderProducts = allProducts.filter(p => new Set(order.products!.map(op => op.productId)).has(p.id))

			setStep2DataWithType({ services: initializeServices(order?.services || [], orderProducts, discount) })
		}

		if (additionalCosts.length) {
			setStep3DataWithType({
				additionalCosts: additionalCosts.map(ac => {
					const existing = order?.additionalCosts?.find((oac: any) => oac.additionalCostId === ac.id)
					if (existing) {
						// Convert quantityByProduct to productQuantities format
						const productQuantities: Record<string, number> = {}
						if ((existing as any).quantityByProduct && Array.isArray((existing as any).quantityByProduct)) {
							;(existing as any).quantityByProduct.forEach((qbp: any) => {
								if (qbp.productId && qbp.quantity !== undefined) {
									productQuantities[qbp.productId] = Number(qbp.quantity) || 0
								}
							})
						}

						return {
							additionalCostId: ac.id,
							isIncluded: true,
							quantity: existing.quantity || 0,
							// Reverse discount to get original price
							price: reverseDiscount(existing.price || 0, discount),
							productQuantities: Object.keys(productQuantities).length > 0 ? productQuantities : undefined
						}
					}
					return { additionalCostId: ac.id, isIncluded: false, quantity: 0, price: 0 }
				})
			})
		}

		setStep4DataWithType({
			acquisitionType: orderAcquisitionType,
			eventId: order?.eventId,
			location: order?.location,
			place: order?.place || '',
			street: order?.street || '',
			contactPerson: order?.contactPerson,
			contactPersonContact: order?.contactPersonContact,
			notes: order?.notes || '',
			discount: order?.discount
		})

		if (order?.customerId) setCustomerIdWithType(order.customerId)

		// Calculate base total from all steps and apply discount
		const step1Total = order?.products?.reduce((sum, p) => sum + reverseDiscount(p.price || 0, discount), 0) || 0
		const step2Total = order?.services?.reduce((sum, s) => sum + reverseDiscount(s.price || 0, discount), 0) || 0
		const step3Total =
			order?.additionalCosts?.reduce((sum, ac) => sum + reverseDiscount(ac.price || 0, discount), 0) || 0
		const baseTotal = step1Total + step2Total + step3Total
		const finalTotal = applyDiscount(baseTotal, discount)
		setTotalAmountWithType(finalTotal)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order, acquisitionType])

	const title = acquisitionType === AcquisitionTypeEnum.RENT ? 'Orders.editRent' : 'Orders.editBuy'
	useNavbarItems({ title, backLabel: 'General.back' })
	useSteps({ totalSteps: TOTAL_STEPS, currentStep })

	// Auto-populate client ID for non-admin users
	useEffect(() => {
		if (!isAdmin && session?.user?.userId && !customerId) {
			setCustomerIdWithType(session.user.userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, session?.user?.userId, acquisitionType])

	useEffect(() => {
		setCurrentStep(currentStep)
	}, [currentStep, setCurrentStep])

	// Initialize step from store or set to 1
	useEffect(() => {
		if (currentStep < 1 || currentStep > TOTAL_STEPS) {
			setWizardStepWithType(1)
		}
	}, [currentStep, TOTAL_STEPS])

	// Cleanup on component unmount
	useEffect(() => {
		return () => {
			cleanupAllData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

	const buildPayload = (): OrderPayload => {
		if (!step1Data || !step4Data) throw new Error('Missing required step data')

		const isServiceDefault = (s: any) => {
			return selectedItems.some((product: Product) => {
				const service = product.servicePrices?.find(svc => (svc.id || svc.serviceId) === s.serviceId)
				return service && (isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy)
			})
		}

		const discount = step4Data.discount

		return {
			id: order.id,
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
				.filter(s => s.isIncluded || isServiceDefault(s))
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
					const isOneTime =
						additionalCosts.find(acc => acc.id === ac.additionalCostId)?.billingType === BillingTypeEnum.ONE_TIME

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
			totalAmount,
			notes: step4Data.notes?.trim() || null,
			discount: step4Data.discount?.toString() === '' ? (null as any) : step4Data.discount
		}
	}

	const onSubmit = async () => {
		if (!step1Data || !step4Data) return

		const result = await updateOrder(buildPayload())
		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyEdited'))
			setTimeout(() => {
				cleanupAllData()
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

	const isValid = () => {
		const { isValid: hasProducts } = validateOrderProducts(step1Data, allProducts, selectedItems)
		const isValidOrderInfo = !!(step4Data?.place && step4Data?.street && customerId)

		if (isAdmin) {
			return currentStep === 1
				? !!customerId
				: currentStep === 2
					? hasProducts
					: currentStep === 5
						? isValidOrderInfo && hasProducts
						: true
		}
		return currentStep === 1
			? hasProducts
			: currentStep === 4
				? !!(customerId && isValidOrderInfo && hasProducts)
				: true
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
									order={order}
								/>
							)}
							{((isAdmin && currentStep === 3) || (!isAdmin && currentStep === 2)) && (
								<Step2Services
									products={selectedItems}
									acquisitionType={acquisitionType}
									order={order}
									serviceLocations={serviceLocations}
								/>
							)}
							{((isAdmin && currentStep === 4) || (!isAdmin && currentStep === 3)) && (
								<Step3AdditionalCosts
									additionalCosts={additionalCosts}
									acquisitionType={acquisitionType}
									order={order}
									products={selectedItems}
								/>
							)}
							{((isAdmin && currentStep === 5) || (!isAdmin && currentStep === 4)) && (
								<Step4OrderInformation
									events={events}
									acquisitionType={acquisitionType}
									isAdmin={isAdmin}
									order={order}
								/>
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
