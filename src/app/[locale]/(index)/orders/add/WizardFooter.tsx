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
}

export const WizardFooter = ({ currentStep, totalSteps, onBack, onPrevious, isValid }: Props) => {
	const t = useTranslations()
	const isLastStep = currentStep === totalSteps

	return (
		<Box className={footer}>
			<Inline gap={4} alignItems="center">
				<Button type="button" variant="secondary" onClick={onPrevious} disabled={currentStep === 1}>
					{t('General.previous')}
				</Button>
				<Button type="submit" variant="primary" disabled={!isValid}>
					{t(isLastStep ? 'General.saveChanges' : 'General.next')}
				</Button>
			</Inline>
		</Box>
	)
}
