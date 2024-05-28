import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'

import { manageJourneyWrapper, stepIndicatior } from './ManageJourney.css'

interface Props {
	children: ReactNode
}

export const ManageJourneyWrapper = ({ children }: Props) => {
	const { totalSteps, currentStep } = useStepsStore()

	return (
		<Box width="100%" style={{ maxHeight: 'calc(100vh - 200px)' }} overflow="auto" paddingX={10} paddingY={8}>
			<Box className={manageJourneyWrapper}>
				<Box display="flex" flexDirection="row" gap={4} paddingX={6}>
					{currentStep &&
						[...Array(currentStep)].map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<Box key={index} className={stepIndicatior} backgroundColor="primary.500" />
						))}
					{totalSteps &&
						currentStep &&
						[...Array(totalSteps - currentStep)].map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<Box key={index} className={stepIndicatior} backgroundColor="neutral.150" />
						))}
				</Box>
				{children}
			</Box>
		</Box>
	)
}
