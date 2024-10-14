'use client'

import { useTranslations } from 'next-intl'

import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'
import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'
import { useSCaseJourneyStore } from '@/store/case-journey'

export const SelectCaseJourneyType = () => {
	const { setType } = useSCaseJourneyStore()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const handleCaseJourneyType = (type: CaseJourneyTypeEnum) => {
		setType(type)
		// if (currentStep) {
		// 	setCurrentStep(currentStep + 1)
		// }
	}

	return (
		<Box paddingTop={6}>
			<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
				<ManageJourneyIntroWrapper>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('Templates.chooseCaseJourneyTypeCreationTitle')}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t('Templates.chooseCaseJourneyTypeCreationDescription')}
						</Text>
						<Box width="100%" style={{ maxWidth: '20.5rem' }}>
							<Stack gap={6}>
								<Button onClick={() => handleCaseJourneyType(CaseJourneyTypeEnum.TEMPLATE)}>
									{t('Templates.createFromTemplate')}
								</Button>
								<Button onClick={() => handleCaseJourneyType(CaseJourneyTypeEnum.CUSTOM)} variant="secondary">
									{t('Templates.createCustom')}
								</Button>
							</Stack>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
			</Box>
		</Box>
	)
}
