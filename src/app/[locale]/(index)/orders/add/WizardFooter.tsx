'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

import { footer } from './WizardFooter.css'

interface Props {
	currentStep: number
	totalSteps: number
	onBack: () => void
	onPrevious: () => void
	isValid?: boolean
	isSubmitting?: boolean
}

export const WizardFooter = ({ currentStep, totalSteps, onBack, onPrevious, isValid, isSubmitting = false }: Props) => {
	const t = useTranslations()
	const isLastStep = currentStep === totalSteps

	return (
		<Box className={footer}>
			<Inline gap={4} alignItems="center">
				<Button type="button" variant="secondary" onClick={onPrevious} disabled={currentStep === 1 || isSubmitting}>
					{t('General.previous')}
				</Button>
				<Button type="submit" variant="primary" disabled={!isValid || isSubmitting}>
					{t(isSubmitting ? 'General.loading' : isLastStep ? 'General.saveChanges' : 'General.next')}
				</Button>
			</Inline>
		</Box>
	)
}
