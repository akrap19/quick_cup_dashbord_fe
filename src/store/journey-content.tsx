import { create } from 'zustand'

type JourneyContentStore = {
	totalSteps?: number
	setTotalSteps: (totalSteps?: number) => void
	currentStep?: number
	setCurrentStep: (currentStep?: number) => void
}

export const useJourneyContentStore = create<JourneyContentStore>(set => ({
	totalSteps: undefined,
	setTotalSteps: totalSteps => set(() => ({ totalSteps })),
	currentStep: undefined,
	setCurrentStep: currentStep => set(() => ({ currentStep }))
}))
