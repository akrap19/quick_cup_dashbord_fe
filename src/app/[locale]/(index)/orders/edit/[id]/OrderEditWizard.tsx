'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { useSteps } from '@/hooks/use-steps'
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

import { Step1Products } from '../../add/steps/Step1Products'
import { Step2Services } from '../../add/steps/Step2Services'
import { Step3AdditionalCosts } from '../../add/steps/Step3AdditionalCosts'
import { Step4OrderInformation } from '../../add/steps/Step4OrderInformation'
import { WizardFooter } from '../../add/WizardFooter'
import { Stack } from '@/components/layout/stack'

interface Props {
	order: Order
	acquisitionType: AcquisitionTypeEnum
	clients: Base[]
	events: Base[]
	additionalCosts: AdditionalCosts[]
	allProducts?: Product[]
	serviceLocations?: Base[]
}

const TOTAL_STEPS = 4

export const OrderEditWizard = ({
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
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems } = isRent ? rentStore : buyStore
	const { setCurrentStep } = useStepsStore()
	const {
		currentStep,
		setCurrentStep: setWizardStep,
		step1Data,
		step2Data,
		step3Data,
		step4Data,
		totalAmount,
		clearWizard,
		setStep1Data,
		setStep2Data,
		setStep3Data,
		setStep4Data,
		setTotalAmount,
		setAcquisitionType
	} = useOrderWizardStore()

	// Initialize buy/rent store with products from order
	useEffect(() => {
		if (order?.products && allProducts.length > 0) {
			const orderProductIds = order.products.map(p => p.productId)
			const productsToAdd = allProducts.filter(p => orderProductIds.includes(p.id))

			// Clear existing items first
			if (isRent) {
				rentStore.clearItems()
				productsToAdd.forEach(product => rentStore.addItem(product))
			} else {
				buyStore.clearItems()
				productsToAdd.forEach(product => buyStore.addItem(product))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order?.products, allProducts, isRent])

	// Initialize wizard store with order data
	useEffect(() => {
		// Initialize Step 1 - Products
		if (order?.products && order.products.length > 0) {
			const productsData = order.products.map(p => ({
				productId: p.productId,
				quantity: p.quantity,
				price: p.price
			}))
			setStep1Data({ products: productsData })
		}

		// Initialize Step 2 - Services
		if (allProducts.length > 0 && order?.products && order.products.length > 0) {
			const orderProductIds = new Set(order.products.map(p => p.productId))
			const orderProducts = allProducts.filter(p => orderProductIds.has(p.id))

			const orderServicesMap = new Map()
			if (order?.services) {
				order.services.forEach((orderService: any) => {
					orderServicesMap.set(orderService.serviceId, {
						quantity: orderService.quantity || 0,
						price: orderService.price || 0
					})
				})
			}

			// Build services list from order products' servicePrices
			const serviceMap = new Map<string, { serviceId: string; isIncluded: boolean; quantity: number; price: number }>()

			orderProducts.forEach((product: Product) => {
				if (product.servicePrices && product.servicePrices.length > 0) {
					product.servicePrices.forEach(service => {
						const serviceId = service.id || service.serviceId
						if (serviceId && !serviceMap.has(serviceId)) {
							const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
							const orderService = orderServicesMap.get(serviceId)

							serviceMap.set(serviceId, {
								serviceId: serviceId,
								isIncluded: isDefault || !!orderService,
								quantity: orderService?.quantity || 0,
								price: orderService?.price || 0
							})
						}
					})
				}
			})

			// Add any services from order that aren't in products (edge case)
			if (order?.services) {
				order.services.forEach((orderService: any) => {
					const serviceId = orderService.serviceId
					if (serviceId && !serviceMap.has(serviceId)) {
						serviceMap.set(serviceId, {
							serviceId: serviceId,
							isIncluded: true,
							quantity: orderService.quantity || 0,
							price: orderService.price || 0
						})
					}
				})
			}

			setStep2Data({ services: Array.from(serviceMap.values()) })
		}

		// Initialize Step 3 - Additional Costs
		if (additionalCosts.length > 0) {
			const additionalCostsData = additionalCosts.map(ac => {
				const existingOrderCost = order?.additionalCosts?.find(oac => oac.additionalCostId === ac.id)
				if (existingOrderCost) {
					return {
						additionalCostId: ac.id,
						isIncluded: true,
						quantity: existingOrderCost.quantity || 0,
						price: existingOrderCost.price || 0
					}
				}
				return {
					additionalCostId: ac.id,
					isIncluded: false,
					quantity: 0,
					price: 0
				}
			})
			setStep3Data({ additionalCosts: additionalCostsData })
		}

		// Initialize Step 4 - Order Information
		setStep4Data({
			acquisitionType: order?.acquisitionType || acquisitionType,
			customerId: order?.customerId,
			eventId: order?.eventId,
			location: order?.location,
			place: order?.place || '',
			street: order?.street || '',
			contactPerson: order?.contactPerson,
			contactPersonContact: order?.contactPersonContact,
			notes: order?.notes || ''
		})

		setAcquisitionType(order?.acquisitionType || acquisitionType)
		setTotalAmount(order?.totalAmount || 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order])

	useNavbarItems({ title: 'Orders.edit', backLabel: 'General.back' })
	useSteps({ totalSteps: TOTAL_STEPS, currentStep })

	useEffect(() => {
		setCurrentStep(currentStep)
	}, [currentStep, setCurrentStep])

	// Initialize step from store or set to 1
	useEffect(() => {
		if (currentStep < 1 || currentStep > TOTAL_STEPS) {
			setWizardStep(1)
		}
	}, [currentStep, setWizardStep])

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

	const onSubmit = async () => {
		if (!step1Data || !step4Data) {
			return
		}

		const payload: OrderPayload = {
			id: order.id,
			acquisitionType: step4Data.acquisitionType || acquisitionType,
			customerId: step4Data.customerId!,
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
				.map(s => ({
					serviceId: s.serviceId,
					quantity: Number(s.quantity) || 0,
					price: Number(s.price) || 0
				})),
			additionalCosts: (step3Data?.additionalCosts || [])
				.filter(ac => ac.isIncluded)
				.map(ac => {
					const additionalCost = additionalCosts.find(acc => acc.id === ac.additionalCostId)
					const isOneTime = additionalCost?.billingType === BillingTypeEnum.ONE_TIME
					return {
						additionalCostId: ac.additionalCostId,
						quantity: isOneTime ? 1 : Number(ac.quantity) || 0,
						price: Number(ac.price) || 0
					}
				}),
			totalAmount: totalAmount,
			notes: step4Data.notes?.trim() ? step4Data.notes.trim() : null
		}

		const result = await updateOrder(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyEdited'))
			clearWizard()
			if (isRent) {
				rentStore.clearItems()
			} else {
				buyStore.clearItems()
			}
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

	// Validation check - each step component handles its own validation
	// We'll check if required data exists for the current step
	const isValid = () => {
		switch (currentStep) {
			case 1:
				// Check if there are products in store and they have quantity > 0
				const hasProductsInStore = selectedItems.length > 0
				const hasQuantity = step1Data?.products?.some(p => Number(p.quantity) > 0) || false
				return hasProductsInStore && hasQuantity
			case 2:
				return true // Services are optional
			case 3:
				return true // Additional costs are optional
			case 4:
				return !!(step4Data?.customerId && step4Data?.place && step4Data?.street)
			default:
				return false
		}
	}

	return (
		<>
			<form onSubmit={handleStepSubmit} style={{ flex: 1 }}>
				<ManageJourneyWrapper onStepClick={setWizardStep}>
					<Stack gap={6}>
						{currentStep === 1 && <Step1Products products={allProducts || []} selectedItems={selectedItems} />}
						{currentStep === 2 && (
							<Step2Services
								products={selectedItems}
								acquisitionType={acquisitionType}
								serviceLocations={serviceLocations}
							/>
						)}
						{currentStep === 3 && <Step3AdditionalCosts additionalCosts={additionalCosts} />}
						{currentStep === 4 && (
							<Step4OrderInformation customers={clients} events={events} acquisitionType={acquisitionType} />
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
			<CancelAddDialog cancelDialog={cancelDialog} title="Orders.cancelAdd" values={{}} />
		</>
	)
}
