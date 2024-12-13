'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

import { actions } from './ManageJourney.css'
import { CancelButton } from '../../button/cancel-button'
import { useStepsStore } from '@/store/steps'

interface Props {
	customSubmitLabel?: string
	disableSubmit?: boolean
	customHandleBack?: () => void
}

export const Actions = ({ customSubmitLabel, disableSubmit, customHandleBack }: Props) => {
	const t = useTranslations()
	const formContext = useFormContext()
	const { currentStep, setCurrentStep } = useStepsStore()
	const submitDisabled =
		disableSubmit !== undefined ? disableSubmit : formContext ? !formContext?.formState.isValid : false

	const handleBack = () => {
		if (currentStep) {
			setCurrentStep(currentStep - 1)
		}
	}

	return (
		<Box className={actions}>
			<Inline gap={4}>
				<Button
					type="button"
					variant="secondary"
					disabled={currentStep === 1 || !currentStep}
					onClick={customHandleBack ?? handleBack}>
					{t('General.back')}
				</Button>
				<Button type="submit" variant="primary" disabled={submitDisabled}>
					{t(customSubmitLabel ?? 'General.next')}
				</Button>
			</Inline>
			<CancelButton />
		</Box>
	)
}
