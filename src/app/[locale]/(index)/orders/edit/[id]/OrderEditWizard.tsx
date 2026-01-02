'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

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
import { useStepsStore } from '@/store/steps'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useOrderWizardStore } from '@/store/order-wizard'
import { Order } from 'api/models/order/order'

import { Step1ClientSelection } from '../../add/steps/Step1ClientSelection'
import { Step1Products } from '../../add/steps/Step1Products'
import { Step2Services } from '../../add/steps/Step2Services'
import { Step3AdditionalCosts } from '../../add/steps/Step3AdditionalCosts'
import { Step4OrderInformation } from '../../add/steps/Step4OrderInformation'
import { WizardFooter } from '../../add/WizardFooter'
import { Stack } from '@/components/layout/stack'
import { useSession } from 'next-auth/react'

interface Props {
	isAdmin: boolean
	order: Order
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Base[]
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
	const { navbarIsLoading } = useNavbarItemsStore()
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems, clearItems } = isRent ? rentStore : buyStore
	const { setCurrentStep } = useStepsStore()
	const {
		currentStep,
		setCurrentStep: setWizardStep,
		step1Data,
		step2Data,
		step3Data,
		step4Data,
		customerId,
		totalAmount,
		clearWizard,
		setStep1Data,
		setStep2Data,
		setStep3Data,
		setStep4Data,
		setCustomerId,
		setTotalAmount,
		setAcquisitionType
	} = useOrderWizardStore()
	const { data: session } = useSession()
	const TOTAL_STEPS = isAdmin ? 5 : 4

	// Helper function to initialize services
	const initializeServices = (orderServices: any[], orderProducts: Product[]) => {
		const orderServicesMap = new Map()
		orderServices.forEach((s: any) => {
			orderServicesMap.set(s.serviceId, {
				quantity: s.quantity || 0,
				price: s.price || 0,
				serviceLocationId: s.serviceLocationId
			})
		})

		const serviceMap = new Map<
			string,
			{ serviceId: string; isIncluded: boolean; quantity: number; price: number; serviceLocationId?: string }
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
						serviceLocationId: orderService?.serviceLocationId
					})
				}
			})
		})

		// Add services from order that aren't in products
		orderServices.forEach((s: any) => {
			if (s.serviceId && !serviceMap.has(s.serviceId)) {
				serviceMap.set(s.serviceId, {
					serviceId: s.serviceId,
					isIncluded: true,
					quantity: s.quantity || 0,
					price: s.price || 0,
					serviceLocationId: s.serviceLocationId
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

	// Initialize wizard store with order data
	useEffect(() => {
		if (order?.products?.length) {
			setStep1Data({
				products: order.products.map(p => ({ productId: p.productId, quantity: p.quantity, price: p.price }))
			})
		}

		if (allProducts.length && order?.products?.length) {
			const orderProducts = allProducts.filter(p => new Set(order.products!.map(op => op.productId)).has(p.id))
			setStep2Data({ services: initializeServices(order?.services || [], orderProducts) })
		}

		if (additionalCosts.length) {
			setStep3Data({
				additionalCosts: additionalCosts.map(ac => {
					const existing = order?.additionalCosts?.find(oac => oac.additionalCostId === ac.id)
					return existing
						? {
								additionalCostId: ac.id,
								isIncluded: true,
								quantity: existing.quantity || 0,
								price: existing.price || 0
							}
						: { additionalCostId: ac.id, isIncluded: false, quantity: 0, price: 0 }
				})
			})
		}

		setStep4Data({
			acquisitionType: order?.acquisitionType || acquisitionType,
			eventId: order?.eventId,
			location: order?.location,
			place: order?.place || '',
			street: order?.street || '',
			contactPerson: order?.contactPerson,
			contactPersonContact: order?.contactPersonContact,
			notes: order?.notes || ''
		})

		if (order?.customerId) setCustomerId(order.customerId)
		setAcquisitionType(order?.acquisitionType || acquisitionType)
		setTotalAmount(order?.totalAmount || 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order])

	useNavbarItems({ title: 'Orders.edit', backLabel: 'General.back' })
	useSteps({ totalSteps: TOTAL_STEPS, currentStep })

	// Auto-populate client ID for non-admin users
	useEffect(() => {
		if (!isAdmin && session?.user?.userId && !customerId) {
			setCustomerId(session.user.userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, session?.user?.userId])

	useEffect(() => {
		setCurrentStep(currentStep)
	}, [currentStep, setCurrentStep])

	// Initialize step from store or set to 1
	useEffect(() => {
		if (currentStep < 1 || currentStep > TOTAL_STEPS) {
			setWizardStep(1)
		}
	}, [currentStep, setWizardStep, TOTAL_STEPS])

	const handleNext = () => {
		if (currentStep < TOTAL_STEPS) {
			setWizardStep(currentStep + 1)
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setWizardStep(currentStep - 1)
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
					price: Number(p.price) || 0
				})) as OrderProduct[],
			services: (step2Data?.services || [])
				.filter(s => s.isIncluded || isServiceDefault(s))
				.map(s => ({
					serviceId: s.serviceId,
					quantity: Number(s.quantity) || 0,
					price: Number(s.price) || 0,
					serviceLocationId: s.serviceLocationId
				})),
			additionalCosts: (step3Data?.additionalCosts || [])
				.filter(ac => ac.isIncluded)
				.map(ac => {
					const isOneTime =
						additionalCosts.find(acc => acc.id === ac.additionalCostId)?.billingType === BillingTypeEnum.ONE_TIME
					return {
						additionalCostId: ac.additionalCostId,
						quantity: isOneTime ? 1 : Number(ac.quantity) || 0,
						price: Number(ac.price) || 0
					}
				}),
			totalAmount,
			notes: step4Data.notes?.trim() || null
		}
	}

	const onSubmit = async () => {
		if (!step1Data || !step4Data) return

		const result = await updateOrder(buildPayload())
		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyEdited'))
			setTimeout(() => {
				clearWizard()
				clearItems()
			}, 2500)
			push(ROUTES.ORDERS)
			refresh()
		}
	}

	const handleStepSubmit = (e: React.FormEvent) => {
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
		const hasProducts = selectedItems.length > 0 && step1Data?.products?.some(p => Number(p.quantity) > 0)
		const isValidOrderInfo = !!(step4Data?.place && step4Data?.street)

		if (isAdmin) {
			return currentStep === 1
				? !!customerId
				: currentStep === 2
					? !!hasProducts
					: currentStep === 5
						? isValidOrderInfo
						: true
		}
		return currentStep === 1 ? !!hasProducts : currentStep === 4 ? !!(customerId && isValidOrderInfo) : true
	}

	return (
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<form onSubmit={handleStepSubmit} style={{ flex: 1 }}>
					<ManageJourneyWrapper
						onStepClick={setWizardStep}
						stepTitleKey={
							isAdmin && currentStep === 1
								? undefined
								: isAdmin && currentStep > 1
									? `Orders.step${currentStep - 1}Title`
									: undefined
						}
						stepDescriptionKey={
							isAdmin && currentStep === 1
								? undefined
								: isAdmin && currentStep > 1
									? `Orders.step${currentStep - 1}Description`
									: undefined
						}>
						<Stack gap={6}>
							{isAdmin && currentStep === 1 && (
								<Step1ClientSelection customers={clients} acquisitionType={acquisitionType} />
							)}
							{((isAdmin && currentStep === 2) || (!isAdmin && currentStep === 1)) && (
								<Step1Products products={allProducts || []} selectedItems={selectedItems} />
							)}
							{((isAdmin && currentStep === 3) || (!isAdmin && currentStep === 2)) && (
								<Step2Services
									products={selectedItems}
									acquisitionType={acquisitionType}
									serviceLocations={serviceLocations}
								/>
							)}
							{((isAdmin && currentStep === 4) || (!isAdmin && currentStep === 3)) && (
								<Step3AdditionalCosts additionalCosts={additionalCosts} />
							)}
							{((isAdmin && currentStep === 5) || (!isAdmin && currentStep === 4)) && (
								<Step4OrderInformation events={events} acquisitionType={acquisitionType} />
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
