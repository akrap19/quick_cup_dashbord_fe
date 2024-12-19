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
import { useStepsStore } from '@/store/steps'
import { Room } from 'api/models/content/room'
import { Language } from 'api/models/language/language'

import { EditRoomForm } from './EditRoomForm'
import { useManageContentAdd } from '@/store/manage-content-add'
import { useEffect } from 'react'
import { PreviewAndPublish } from './PreviewAndPublish'

interface Props {
	room: Room
	language: Language
	languages: Language[]
}

export const EditRoomLanguageNavigation = ({ room, language, languages }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const { currentStep } = useStepsStore()
	const { setImagesToDisplay, setAudioToDisplay } = useManageContentAdd()
	const defaultImages = room?.roomImages?.map(roomImage => roomImage?.url)

	useNavbarItems({
		title: 'ManageContent.editRoom',
		backLabel: 'ManageContent.back'
	})

	useSteps({
		totalSteps: 2,
		currentStep: 1
	})

	useEffect(() => {
		setImagesToDisplay(defaultImages)
		setAudioToDisplay(language?.languageId, room?.audio)
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
											{t('ManageContent.editRoom')}
										</Text>
									</Box>
									<Box display="flex" justify="center" textAlign="center">
										<Box style={{ maxWidth: '33rem' }}>
											<Text fontSize="small" color="neutral.800">
												{t('ManageContent.editRoomDescription')}
											</Text>
										</Box>
									</Box>
								</Stack>
								<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
									<EditRoomForm room={room} language={language} />
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
