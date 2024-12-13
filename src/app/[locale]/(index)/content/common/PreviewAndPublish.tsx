'use client'

import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { Loader } from '@/components/custom/loader/Loader'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { publishLanguage } from 'api/services/languages'

import { LanguageLabel } from './LanguageLabel'
import { useRouter } from 'next/navigation'
import { createAboutBulk } from 'api/services/content/about'
import { createRoomBulk } from 'api/services/content/rooms'
import { createStaffBulk } from 'api/services/content/staff'
import { Content } from 'api/models/content/content'
import { ContentPayload } from 'api/models/content/contentPayload'
import { Audio } from 'api/models/common/audio'

export const PreviewAndPublish = () => {
	const t = useTranslations()
	const { refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language, contentPayload, imagesToDisplay, audioToDisplay, isContentEmpty, isAllContentEmpty } =
		useManageContent()

	const transformContent = (
		contentPayload: {
			about?: ContentPayload[]
			rooms?: ContentPayload[]
			staff?: ContentPayload[]
		},
		imagesToDisplay: { id: string; images: string[] }[],
		audioToDisplay: { id: string; audio: Audio }[]
	) => {
		const extractIndex = (id: string): number => {
			const match = id.match(/items\[(\d+)\]/)
			return match ? parseInt(match[1], 10) : -1
		}

		const groupMediaById = <T extends { id: string }>(
			mediaArray: T[],
			key: 'audio' | 'images'
		): Record<string, T[]> => {
			return mediaArray.reduce(
				(acc, item) => {
					const [type] = item.id.split('.')
					if (!acc[type]) {
						acc[type] = []
					}
					acc[type].push(item)
					acc[type].sort((a, b) => extractIndex(a.id) - extractIndex(b.id))
					return acc
				},
				{} as Record<string, T[]>
			)
		}

		const groupedImages = groupMediaById(imagesToDisplay, 'images')
		const groupedAudio = groupMediaById(audioToDisplay, 'audio')

		const mapContent = (contentArray: ContentPayload[] | undefined, type: 'about' | 'rooms' | 'staff') => {
			if (!contentArray) return undefined

			return contentArray.map((item, index) => ({
				...item,
				aboutImages: groupedImages[`items[${index}]`]
					?.find(image => image?.id?.includes(type))
					?.images?.map(image => ({ url: image })),
				roomImages: groupedImages[`items[${index}]`]
					?.find(image => image?.id?.includes(type))
					?.images?.map(image => ({ url: image })),
				staffImages: groupedImages[`items[${index}]`]
					?.find(image => image?.id?.includes(type))
					?.images?.map(image => ({ url: image })),
				audioURL: groupedAudio[`items[${index}]`]?.find(audio => audio?.id?.includes(type))?.audio?.url
			}))
		}

		return {
			abouts: mapContent(contentPayload.about, 'about'),
			rooms: mapContent(contentPayload.rooms, 'rooms'),
			staff: mapContent(contentPayload.staff, 'staff')
		}
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!isContentEmpty.about) {
			await createAboutBulk(contentPayload?.about)
		}
		if (!isContentEmpty.rooms) {
			await createRoomBulk(contentPayload?.rooms)
		}
		if (!isContentEmpty.staff) {
			await createStaffBulk(contentPayload?.staff)
		}

		if (language) {
			const result = await publishLanguage(language?.id)

			if (result?.message === 'OK') {
				SuccessToast(t('ManageContent.contentSuccessfullyPublished'))

				refresh()
				if (currentStep) {
					setCurrentStep(currentStep + 1)
				}
			}
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<Box paddingTop={6}>
				<Stack gap={6}>
					<Stack gap={4}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('ManageContent.previewAndPublishContent')}
							</Text>
						</Box>
						<Box display="flex" justify="center" textAlign="center">
							<Box style={{ maxWidth: '26rem' }}>
								<Text fontSize="small" color="neutral.800">
									{t('ManageContent.previewAndPublishContentDescription')}
								</Text>
							</Box>
						</Box>
					</Stack>
					<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
						{contentPayload ? (
							<>
								<LanguageLabel language={language?.name} />
								<MobilePreview
									content={transformContent(contentPayload ?? {}, imagesToDisplay, audioToDisplay) as Content}
								/>
							</>
						) : isAllContentEmpty() ? (
							<ManageJourneyIntroWrapper>
								<NoListData
									title="ManageContent.noContentToBePublishedTitle"
									description="ManageContent.noContentToBePublishedDescription"
									setNavbarItems={false}
									buttonLabel="ManageContent.add"
									onClick={() => setCurrentStep(2)}
									distanceFromTop="0px"
								/>
							</ManageJourneyIntroWrapper>
						) : (
							<Loader />
						)}
					</Box>
				</Stack>
			</Box>
			<Actions customSubmitLabel="General.publish" disableSubmit={isAllContentEmpty()} />
		</form>
	)
}
