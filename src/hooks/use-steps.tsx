import { useEffect } from 'react'

import { useStepsStore } from '@/store/steps'

interface Steps {
	totalSteps?: number
	currentStep?: number
}

export const useSteps = (stepsData: Steps) => {
	const { setTotalSteps, setCurrentStep } = useStepsStore()

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
