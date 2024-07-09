'use client'

import { Loader } from '@/components/custom/loader/Loader'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey'
import { useTranslations } from 'next-intl'
import { AddStaffForm } from './AddStaffForm'
import { Language } from 'api/models/language/language'
import { useNavbarItemsStore } from '@/store/navbar'
import { Tabs } from '@/components/navigation/tabs'
import { useStepsStore } from '@/store/steps'

interface Props {
	languages: Language[]
}

export const AddStaffLanguageNavigation = ({ languages }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const { currentStep } = useStepsStore()

	useNavbarItems({
		title: 'ManageContent.addStaff',
		backLabel: 'ManageContent.back',
		location: 'Barnahus Stockholm, Sweden'
	})

	useSteps({
		totalSteps: languages.length,
		currentStep: 1
	})

	return (
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<ManageJourneyWrapper>
					<Box paddingTop={6}>
						<Stack gap={6}>
							<Stack gap={4}>
								<Box display="flex" justify="center">
									<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
										{t('ManageContent.addStaff')}
									</Text>
								</Box>
								<Box display="flex" justify="center" textAlign="center">
									<Box style={{ maxWidth: '33rem' }}>
										<Text fontSize="small" color="neutral.800">
											{t('ManageContent.addStaffDescription')}
										</Text>
									</Box>
								</Box>
							</Stack>
							<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
								<Tabs size="large" variant="span">
									{languages.map((language: Language, index: number) => (
										<Tabs.Tab
											value={language.name}
											defaultTab={index === 0}
											currentlyActiveTab={index + 1 === currentStep}>
											{language.name + (language.autoTranslate ? ` (${t('ManageContent.autoTranslate')})` : '')}
										</Tabs.Tab>
									))}
									{languages.map((language: Language) => (
										<Tabs.Panel value={language.name}>
											<AddStaffForm language={language} />
										</Tabs.Panel>
									))}
								</Tabs>
							</Box>
						</Stack>
					</Box>
				</ManageJourneyWrapper>
			)}
		</>
	)
}
