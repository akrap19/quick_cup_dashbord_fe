'use client'

import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { Language } from 'api/models/language/language'
import { useManageContentAdd } from '@/store/manage-content-add'
import { Loader } from '@/components/custom/loader/Loader'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { LanguageLabel } from '../../common/LanguageLabel'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { ROUTES } from 'parameters'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useRouter } from 'next/navigation'
import { updateRoom } from 'api/services/content/rooms'

interface Props {
	language: Language
}

export const PreviewAndPublish = ({ language }: Props) => {
	const t = useTranslations()
	const { refresh, push } = useRouter()
	const { rooms, imagesToDisplay, audioToDisplay } = useManageContentAdd()
	const { isAllContentEmpty } = useManageContent()
	const roomToShow = rooms?.map((room: any) => ({
		languageId: room.languageId,
		title: room.title,
		description: room.description,
		audioURL: audioToDisplay ? audioToDisplay[0]?.audio?.url : [],
		roomImages: imagesToDisplay?.map(imageUrl => ({
			url: imageUrl
		}))
	}))

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (rooms) {
			const result = await updateRoom({
				roomTranslationId: rooms[0]?.roomTranslationId,
				title: replaceEmptyStringWithNull(rooms[0].title),
				description: rooms[0]?.description && removeHtmlTags(rooms[0]?.description) ? rooms[0]?.description : null,
				images: rooms[0]?.images,
				deletedImages: rooms[0]?.deletedImages as any,
				audioId: replaceEmptyStringWithNull(rooms[0].audioId)
			})

			if (result?.message === 'OK') {
				refresh()
				SuccessToast(t('ManageContent.roomsContentSccessfullyUpdated'))

				push(ROUTES.CONTENT)
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
						<LanguageLabel language={language?.name} />
						{rooms && rooms[0] ? (
							<MobilePreview
								content={{ rooms: roomToShow ? ([...roomToShow] as any) : [] }}
								defaultContentType={'rooms'}
							/>
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
