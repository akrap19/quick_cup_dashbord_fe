import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

export interface Step1ProductsData {
	products: Array<{
		productId: string
		quantity: number
	}>
}

export interface Step2ServicesData {
	services: Array<{
		serviceId: string
		isIncluded: boolean
		quantity: number
		productQuantities?: Record<string, number>
		serviceLocationId?: string
	}>
}

export interface Step3AdditionalCostsData {
	additionalCosts: Array<{
		additionalCostId: string
		isIncluded: boolean
		quantity: number
		productQuantities?: Record<string, number>
		productFileIds?: Record<string, string>
		productFileInfos?: Record<string, { id: string; name?: string; url?: string }>
	}>
}

export interface Step4OrderInformationData {
	acquisitionType: AcquisitionTypeEnum
	eventId?: string
	location?: string
	place?: string
	street?: string
	contactPerson?: string
	contactPersonContact?: string
	notes?: string
}

interface OrderData {
	currentStep: number
	customerId?: string
	serviceLocationId?: string | null
	step1Data?: Step1ProductsData
	step2Data?: Step2ServicesData
	step3Data?: Step3AdditionalCostsData
	step4Data?: Step4OrderInformationData
}

type OrderWizardStore = {
	buyOrder: OrderData
	rentOrder: OrderData
	currentAcquisitionType?: AcquisitionTypeEnum
	// Getters that return data for a specific acquisition type
	getCurrentStep: (type: AcquisitionTypeEnum) => number
	getCustomerId: (type: AcquisitionTypeEnum) => string | undefined
	getServiceLocationId: (type: AcquisitionTypeEnum) => string | null | undefined
	getStep1Data: (type: AcquisitionTypeEnum) => Step1ProductsData | undefined
	getStep2Data: (type: AcquisitionTypeEnum) => Step2ServicesData | undefined
	getStep3Data: (type: AcquisitionTypeEnum) => Step3AdditionalCostsData | undefined
	getStep4Data: (type: AcquisitionTypeEnum) => Step4OrderInformationData | undefined
	// Setters that set data for a specific acquisition type
	setCurrentStep: (step: number, type: AcquisitionTypeEnum) => void
	setCustomerId: (id: string | undefined, type: AcquisitionTypeEnum) => void
	setServiceLocationId: (id: string | null | undefined, type: AcquisitionTypeEnum) => void
	setStep1Data: (data: Step1ProductsData, type: AcquisitionTypeEnum) => void
	setStep2Data: (data: Step2ServicesData, type: AcquisitionTypeEnum) => void
	setStep3Data: (data: Step3AdditionalCostsData, type: AcquisitionTypeEnum) => void
	setStep4Data: (data: Step4OrderInformationData, type: AcquisitionTypeEnum) => void
	setAcquisitionType: (type: AcquisitionTypeEnum) => void
	clearWizard: (type?: AcquisitionTypeEnum) => void
}

const defaultOrderData: OrderData = {
	currentStep: 1,
	customerId: undefined,
	step1Data: undefined,
	step2Data: undefined,
	step3Data: undefined,
	step4Data: undefined
}

export const useOrderWizardStore = create<OrderWizardStore>()(
	persist(
		(set, get) => ({
			buyOrder: { ...defaultOrderData },
			rentOrder: { ...defaultOrderData },
			currentAcquisitionType: undefined,
			// Getters
			getCurrentStep: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.currentStep
			},
			getCustomerId: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.customerId
			},
			getServiceLocationId: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.serviceLocationId
			},
			getStep1Data: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.step1Data
			},
			getStep2Data: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.step2Data
			},
			getStep3Data: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.step3Data
			},
			getStep4Data: type => {
				const order = type === AcquisitionTypeEnum.BUY ? get().buyOrder : get().rentOrder
				return order.step4Data
			},
			// Setters
			setCurrentStep: (step, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, currentStep: step } }
					}
					return { rentOrder: { ...state.rentOrder, currentStep: step } }
				}),
			setCustomerId: (id, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, customerId: id } }
					}
					return { rentOrder: { ...state.rentOrder, customerId: id } }
				}),
			setServiceLocationId: (id, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, serviceLocationId: id } }
					}
					return { rentOrder: { ...state.rentOrder, serviceLocationId: id } }
				}),
			setStep1Data: (data, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, step1Data: data } }
					}
					return { rentOrder: { ...state.rentOrder, step1Data: data } }
				}),
			setStep2Data: (data, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, step2Data: data } }
					}
					return { rentOrder: { ...state.rentOrder, step2Data: data } }
				}),
			setStep3Data: (data, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, step3Data: data } }
					}
					return { rentOrder: { ...state.rentOrder, step3Data: data } }
				}),
			setStep4Data: (data, type) =>
				set(state => {
					if (type === AcquisitionTypeEnum.BUY) {
						return { buyOrder: { ...state.buyOrder, step4Data: data } }
					}
					return { rentOrder: { ...state.rentOrder, step4Data: data } }
				}),
			setAcquisitionType: type => set({ currentAcquisitionType: type }),
			clearWizard: type => {
				if (type) {
					// Clear specific order type
					set(state => {
						if (type === AcquisitionTypeEnum.BUY) {
							return { buyOrder: { ...defaultOrderData } }
						}
						return { rentOrder: { ...defaultOrderData } }
					})
				} else {
					// Clear all
					set({
						buyOrder: { ...defaultOrderData },
						rentOrder: { ...defaultOrderData },
						currentAcquisitionType: undefined
					})
				}
			}
		}),
		{
			name: 'order-wizard-store'
		}
	)
)
