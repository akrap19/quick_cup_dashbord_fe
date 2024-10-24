'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useStepsStore } from '@/store/steps'

import { actions } from './ManageJourney.css'
import { CancelButton } from '../../button/cancel-button'

interface Props {
	customSubmitLabel?: string
}

export const Actions = ({ customSubmitLabel }: Props) => {
	const t = useTranslations()
	const formContext = useFormContext()
	const { currentStep, setCurrentStep } = useStepsStore()

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
				<Button type="submit" variant="primary" disabled={formContext ? !formContext?.formState.isValid : false}>
					{t(customSubmitLabel ?? 'General.next')}
				</Button>
			</Inline>
			<CancelButton />
		</Box>
	)
}
