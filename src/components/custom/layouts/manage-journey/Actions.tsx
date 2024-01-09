'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useJourneyContentStore } from '@/store/journey-content'

import { actions } from './ManageJourney.css'
import { CancelButton } from '../../button/cancel-button'

export const Actions = () => {
	const t = useTranslations()
	const formContext = useFormContext()
	const { currentStep, setCurrentStep } = useJourneyContentStore()

	const handleBack = () => {
		if (currentStep) {
			setCurrentStep(currentStep - 1)
		}
	}

	return (
		<Box className={actions}>
			<Inline gap={4}>
				<Button variant="secondary" disabled={currentStep === 1 || !currentStep} onClick={handleBack}>
					{t('General.back')}
				</Button>
				<Button type="submit" variant="primary" disabled={!formContext.formState.isValid}>
					{t('General.next')}
				</Button>
			</Inline>
			<CancelButton />
		</Box>
	)
}
