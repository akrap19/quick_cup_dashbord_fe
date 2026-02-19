'use client'

import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'

import { manageJourneyWrapper, stepIndicatior } from './ManageJourney.css'
import { Divider } from '@/components/layout/divider'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'

interface Props {
	children: ReactNode
	onStepClick?: (stepNumber: number) => void
	stepTitleKey?: string
	stepDescriptionKey?: string
}

export const ManageJourneyWrapper = ({ children, onStepClick, stepTitleKey, stepDescriptionKey }: Props) => {
	const { totalSteps, currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const handleStepClick = (stepNumber: number) => {
		if (stepNumber !== currentStep && stepNumber > 0 && totalSteps && stepNumber <= totalSteps) {
			if (onStepClick) {
				onStepClick(stepNumber)
			} else {
				setCurrentStep(stepNumber)
			}
		}
	}

	return (
		<Box width="100%" paddingX={10} paddingY={8} style={{ height: 'calc(100vh - 200px)' }} overflow="auto">
			<Box className={manageJourneyWrapper}>
				<Box display="flex" flexDirection="row" gap={4} paddingX={6} paddingBottom={6}>
					{currentStep &&
						[...Array(currentStep)].map((_, index) => {
							const stepNumber = index + 1
							return (
								// eslint-disable-next-line react/no-array-index-key
								<Box
									key={index}
									className={stepIndicatior}
									backgroundColor="primary.500"
									onClick={() => handleStepClick(stepNumber)}
									style={{ cursor: 'pointer' }}
								/>
							)
						})}
					{totalSteps &&
						currentStep &&
						[...Array(totalSteps - currentStep)].map((_, index) => {
							const stepNumber = currentStep + index + 1
							return (
								// eslint-disable-next-line react/no-array-index-key
								<Box
									key={index}
									className={stepIndicatior}
									backgroundColor="neutral.150"
									onClick={() => handleStepClick(stepNumber)}
									style={{ cursor: 'pointer' }}
								/>
							)
						})}
				</Box>
				{(stepTitleKey || stepDescriptionKey) && (
					<Box display="flex" flexDirection="column" alignItems="center" paddingBottom={4} paddingX={6}>
						<Heading variant="h3" color="neutral.900" textAlign="center">
							{t(stepTitleKey || `Orders.step${currentStep}Title`)}
						</Heading>
						<Text lineHeight="xlarge" color="neutral.700" textAlign="center" style={{ maxWidth: '600px' }}>
							{t(stepDescriptionKey || `Orders.step${currentStep}Description`)}
						</Text>
					</Box>
				)}
				<Divider />
				<Box paddingX={6} paddingTop={6}>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
