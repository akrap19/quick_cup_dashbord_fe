import { create } from 'zustand'

type StepsStore = {
	totalSteps?: number
	setTotalSteps: (totalSteps?: number) => void
	currentStep?: number
	setCurrentStep: (currentStep?: number) => void
}

export const useStepsStore = create<StepsStore>(set => ({
	totalSteps: undefined,
	setTotalSteps: totalSteps => set(() => ({ totalSteps })),
	currentStep: undefined,
	setCurrentStep: currentStep => set(() => ({ currentStep }))
}))
