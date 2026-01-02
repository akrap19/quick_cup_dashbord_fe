import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

export interface Step1ProductsData {
	products: Array<{
		productId: string
		quantity: number
		price: number
	}>
}

export interface Step2ServicesData {
	services: Array<{
		serviceId: string
		isIncluded: boolean
		quantity: number
		price: number
		productQuantities?: Record<string, number>
		serviceLocationId?: string
	}>
}

export interface Step3AdditionalCostsData {
	additionalCosts: Array<{
		additionalCostId: string
		isIncluded: boolean
		quantity: number
		price: number
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

type OrderWizardStore = {
	currentStep: number
	acquisitionType?: AcquisitionTypeEnum
	customerId?: string
	step1Data?: Step1ProductsData
	step2Data?: Step2ServicesData
	step3Data?: Step3AdditionalCostsData
	step4Data?: Step4OrderInformationData
	totalAmount: number
	setCurrentStep: (step: number) => void
	setAcquisitionType: (type: AcquisitionTypeEnum) => void
	setCustomerId: (id: string) => void
	setStep1Data: (data: Step1ProductsData) => void
	setStep2Data: (data: Step2ServicesData) => void
	setStep3Data: (data: Step3AdditionalCostsData) => void
	setStep4Data: (data: Step4OrderInformationData) => void
	setTotalAmount: (amount: number) => void
	clearWizard: () => void
}

export const useOrderWizardStore = create<OrderWizardStore>()(
	persist(
		(set, get) => ({
			currentStep: 1,
			acquisitionType: undefined,
			customerId: undefined,
			step1Data: undefined,
			step2Data: undefined,
			step3Data: undefined,
			step4Data: undefined,
			totalAmount: 0,
			setCurrentStep: step => set({ currentStep: step }),
			setAcquisitionType: type => set({ acquisitionType: type }),
			setCustomerId: id => set({ customerId: id }),
			setStep1Data: data => set({ step1Data: data }),
			setStep2Data: data => set({ step2Data: data }),
			setStep3Data: data => set({ step3Data: data }),
			setStep4Data: data => set({ step4Data: data }),
			setTotalAmount: amount => set({ totalAmount: amount }),
			clearWizard: () =>
				set({
					currentStep: 1,
					acquisitionType: undefined,
					customerId: undefined,
					step1Data: undefined,
					step2Data: undefined,
					step3Data: undefined,
					step4Data: undefined,
					totalAmount: 0
				})
		}),
		{
			name: 'order-wizard-store'
		}
	)
)
