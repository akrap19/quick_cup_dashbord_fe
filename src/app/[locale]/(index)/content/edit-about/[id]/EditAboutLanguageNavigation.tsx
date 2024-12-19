'use client'

import { useTranslations } from 'next-intl'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey'
import { Loader } from '@/components/custom/loader/Loader'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useNavbarItemsStore } from '@/store/navbar'
import { About } from 'api/models/content/about'

import { EditAboutForm } from './EditAboutForm'
import { Language } from 'api/models/language/language'
import { useStepsStore } from '@/store/steps'
import { PreviewAndPublish } from './PreviewAndPublish'
import { useEffect } from 'react'
import { useManageContentAdd } from '@/store/manage-content-add'

interface Props {
	about: About
	language: Language
	languages: Language[]
}

export const EditAboutLanguageNavigation = ({ about, language }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const { currentStep } = useStepsStore()
	const { setImagesToDisplay, setAudioToDisplay } = useManageContentAdd()
	const defaultImages = about?.aboutImages?.map(aboutImage => aboutImage?.url)

	useNavbarItems({
		title: 'ManageContent.editAbout',
		backLabel: 'ManageContent.back'
	})

	useSteps({
		totalSteps: 2,
		currentStep: 1
	})

	useEffect(() => {
		setImagesToDisplay(defaultImages)
		setAudioToDisplay(language?.languageId, about?.audio)
	}, [])

	return (
		<Box width="100%">
			{navbarIsLoading ? (
				<Loader />
			) : (
				<ManageJourneyWrapper>
					{currentStep === 1 && (
						<Box paddingTop={6}>
							<Stack gap={6}>
								<Stack gap={4}>
									<Box display="flex" justify="center">
										<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
											{t('ManageContent.editAbout')}
										</Text>
									</Box>
									<Box display="flex" justify="center" textAlign="center">
										<Box style={{ maxWidth: '33rem' }}>
											<Text fontSize="small" color="neutral.800">
												{t('ManageContent.editAboutDescription')}
											</Text>
										</Box>
									</Box>
								</Stack>
								<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
									<EditAboutForm about={about} language={language} />
								</Box>
							</Stack>
						</Box>
					)}
					{currentStep === 2 && <PreviewAndPublish language={language} />}
				</ManageJourneyWrapper>
			)}
		</Box>
	)
}
