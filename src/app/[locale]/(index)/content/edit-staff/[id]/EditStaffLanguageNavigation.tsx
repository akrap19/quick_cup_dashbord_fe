'use client'

import { useTranslations } from 'next-intl'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey'
import { Loader } from '@/components/custom/loader/Loader'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Tabs } from '@/components/navigation/tabs'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useNavbarItemsStore } from '@/store/navbar'
import { useStepsStore } from '@/store/steps'
import { Staff } from 'api/models/content/staff'
import { Language } from 'api/models/language/language'

import { EditStaffForm } from './EditStaffForm'

interface Props {
	staff: Staff
	languages: Language[]
}

export const EditStaffLanguageNavigation = ({ staff, languages }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const { currentStep } = useStepsStore()

	useNavbarItems({
		title: 'ManageContent.editStaff',
		backLabel: 'ManageContent.back'
	})

	useSteps({
		totalSteps: languages.length,
		currentStep: 1
	})

	return (
		<Box width="100%">
			{navbarIsLoading ? (
				<Loader />
			) : (
				<ManageJourneyWrapper>
					<Box paddingTop={6}>
						<Stack gap={6}>
							<Stack gap={4}>
								<Box display="flex" justify="center">
									<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
										{t('ManageContent.editStaff')}
									</Text>
								</Box>
								<Box display="flex" justify="center" textAlign="center">
									<Box style={{ maxWidth: '33rem' }}>
										<Text fontSize="small" color="neutral.800">
											{t('ManageContent.editStaffDescription')}
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
											<EditStaffForm staff={staff} />
										</Tabs.Panel>
									))}
								</Tabs>
							</Box>
						</Stack>
					</Box>
				</ManageJourneyWrapper>
			)}
		</Box>
	)
}
