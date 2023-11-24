import { useEffect } from 'react'

import { useJourneyContentStore } from '@/store/journey-content'

interface JourneyContentSteps {
	totalSteps?: number
	currentStep?: number
}

export const useJourneyContentSteps = (stepsData: JourneyContentSteps) => {
	const { setTotalSteps, setCurrentStep } = useJourneyContentStore()

	useEffect(() => {
		setTotalSteps(stepsData.totalSteps)

		return () => {
			setTotalSteps(undefined)
		}
	}, [stepsData.totalSteps])

	useEffect(() => {
		if (stepsData.currentStep !== undefined) {
			setCurrentStep(stepsData.currentStep)
		}

		return () => {
			setCurrentStep(undefined)
		}
	}, [stepsData.currentStep])
}
