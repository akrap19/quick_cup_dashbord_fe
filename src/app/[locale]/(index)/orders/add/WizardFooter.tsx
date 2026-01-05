'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'

import { footer } from './WizardFooter.css'

interface Props {
	currentStep: number
	totalSteps: number
	totalAmountLabel: string
	onBack: () => void
	onPrevious: () => void
	isValid?: boolean
}

export const WizardFooter = ({ currentStep, totalSteps, totalAmountLabel, onBack, onPrevious, isValid }: Props) => {
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
			<Text fontSize="xbig" color="neutral.900" fontWeight="semibold">
				{totalAmountLabel}
			</Text>
		</Box>
	)
}
