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
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import {
	useOrderWizardStore,
	Step1ProductsData,
	Step2ServicesData,
	Step3AdditionalCostsData,
	Step4OrderInformationData
} from '@/store/order-wizard'
import { Order } from 'api/models/order/order'
import { getFileUrl } from '@/utils/downloadFile'

import { Step1ClientSelection } from '../../add/steps/Step1ClientSelection'
import { Step1Products } from '../../add/steps/Step1Products'
import { Step2Services } from '../../add/steps/Step2Services'
import { Step3AdditionalCosts } from '../../add/steps/Step3AdditionalCosts'
import { Step4OrderInformation } from '../../add/steps/Step4OrderInformation'
import { WizardFooter } from '../../add/WizardFooter'
import { Stack } from '@/components/layout/stack'
import { useSession } from 'next-auth/react'
import { validateOrderProducts } from 'utils/orderValidation'

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
		setStep1Data,
		setStep2Data,
		setStep3Data,
		setStep4Data,
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
	const setStep1DataWithType = (data: Step1ProductsData) => setStep1Data(data, acquisitionType)
	const setStep2DataWithType = (data: Step2ServicesData) => setStep2Data(data, acquisitionType)
	const setStep3DataWithType = (data: Step3AdditionalCostsData) => setStep3Data(data, acquisitionType)
	const setStep4DataWithType = (data: Step4OrderInformationData) => setStep4Data(data, acquisitionType)
	const setCustomerIdWithType = (id: string) => setCustomerId(id, acquisitionType)
	const clearWizardWithType = () => clearWizard(acquisitionType)
	const { data: session } = useSession()
	const TOTAL_STEPS = isAdmin ? 5 : 4

	// Track Step3 form validation state
	const [step3FormValid, setStep3FormValid] = useState(true)

	// Helper function to initialize services
	const initializeServices = (orderServices: any[], orderProducts: Product[]) => {
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

			orderServicesMap.set(s.serviceId, {
				quantity: s.quantity || 0,
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

				serviceMap.set(s.serviceId, {
					serviceId: s.serviceId,
					isIncluded: true,
					quantity: s.quantity || 0,
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

	useEffect(() => {
		setAcquisitionType(acquisitionType)
	}, [acquisitionType, setAcquisitionType])

	// Initialize wizard store with order data
	useEffect(() => {
		const orderAcquisitionType = order?.acquisitionType || acquisitionType

		if (order?.products?.length) {
			setStep1DataWithType({
				products: order.products.map(p => ({
					productId: p.productId,
					quantity: p.quantity
				}))
			})
		}

		if (allProducts.length && order?.products?.length) {
			const orderProducts = allProducts.filter(p => new Set(order.products!.map(op => op.productId)).has(p.id))
			setStep2DataWithType({ services: initializeServices(order?.services || [], orderProducts) })
		}

		if (additionalCosts.length) {
			setStep3DataWithType({
				additionalCosts: additionalCosts.map(ac => {
					const existing = order?.additionalCosts?.find((oac: any) => oac.additionalCostId === ac.id)
					if (existing) {
						const productQuantities: Record<string, number> = {}
						const productFileIds: Record<string, string> = {}
						const productFileInfos: Record<string, { id: string; name?: string; url?: string }> = {}
						if ((existing as any).quantityByProduct && Array.isArray((existing as any).quantityByProduct)) {
							;(existing as any).quantityByProduct.forEach((qbp: any) => {
								if (qbp.productId) {
									if (qbp.quantity !== undefined) {
										productQuantities[qbp.productId] = Number(qbp.quantity) || 0
									}
									if (qbp.fileId) {
										productFileIds[qbp.productId] = qbp.fileId
										const fileUrl = qbp.fileUrl || (qbp.fileId ? getFileUrl(qbp.fileId) : undefined)
										productFileInfos[qbp.productId] = {
											id: qbp.fileId,
											url: fileUrl
										}
										if (qbp.quantity === undefined && !productQuantities[qbp.productId]) {
											productQuantities[qbp.productId] = 0
										}
									}
								}
							})
						}

						return {
							additionalCostId: ac.id,
							isIncluded: true,
							quantity: existing.quantity || 0,
							productQuantities: Object.keys(productQuantities).length > 0 ? productQuantities : undefined,
							productFileIds: Object.keys(productFileIds).length > 0 ? productFileIds : undefined,
							productFileInfos: Object.keys(productFileInfos).length > 0 ? productFileInfos : undefined
						}
					}
					return { additionalCostId: ac.id, isIncluded: false, quantity: 0 }
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
			notes: order?.notes || ''
		})

		if (order?.customerId) setCustomerIdWithType(order.customerId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order, acquisitionType, allProducts])

	useNavbarItems({
		title: isRent ? 'Orders.editRent' : 'Orders.editBuy',
		backLabel: 'General.back'
	})
	useSteps({ totalSteps: TOTAL_STEPS, currentStep })

	useEffect(() => {
		if (!isAdmin && session?.user?.userId && !customerId) {
			setCustomerIdWithType(session.user.userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, session?.user?.userId, acquisitionType])

	useEffect(() => {
		setCurrentStep(currentStep)
	}, [currentStep, setCurrentStep])

	useEffect(() => {
		if (currentStep < 1 || currentStep > TOTAL_STEPS) {
			setWizardStep(1, acquisitionType)
		}
	}, [currentStep, acquisitionType, TOTAL_STEPS, setWizardStep])

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

		const result = await updateOrder(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('Orders.successfullyEdited'))
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
		const { isValid: productsValid } = validateOrderProducts(step1Data, allProducts, selectedItems)
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
									selectedItems={selectedItems}
									acquisitionType={acquisitionType}
								/>
							)}
							{(isAdmin ? currentStep === 3 : currentStep === 2) && (
								<Step2Services
									products={selectedItems}
									acquisitionType={acquisitionType}
									order={order}
									serviceLocations={serviceLocations}
								/>
							)}
							{(isAdmin ? currentStep === 4 : currentStep === 3) && (
								<Step3AdditionalCosts
									additionalCosts={additionalCosts}
									acquisitionType={acquisitionType}
									order={order}
									products={selectedItems}
									onValidationChange={setStep3FormValid}
								/>
							)}
							{(isAdmin ? currentStep === 5 : currentStep === 4) && (
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
