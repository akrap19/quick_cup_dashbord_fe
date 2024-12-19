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
import { updateAbout } from 'api/services/content/about'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { ROUTES } from 'parameters'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useRouter } from 'next/navigation'

interface Props {
	language: Language
}

export const PreviewAndPublish = ({ language }: Props) => {
	const t = useTranslations()
	const { refresh, push } = useRouter()
	const { abouts, imagesToDisplay, audioToDisplay } = useManageContentAdd()
	const { isAllContentEmpty } = useManageContent()
	const aboutToShow = abouts?.map((about: any) => ({
		languageId: about.languageId,
		title: about.title,
		description: about.description,
		audioURL: audioToDisplay ? audioToDisplay[0]?.audio?.url : [],
		aboutImages: imagesToDisplay?.map(imageUrl => ({
			url: imageUrl
		}))
	}))

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (abouts) {
			const result = await updateAbout({
				aboutTranslationId: abouts[0]?.aboutTranslationId,
				title: replaceEmptyStringWithNull(abouts[0].title),
				description: abouts[0]?.description && removeHtmlTags(abouts[0]?.description) ? abouts[0]?.description : null,
				images: abouts[0]?.images,
				deletedImages: abouts[0]?.deletedImages as any,
				audioId: replaceEmptyStringWithNull(abouts[0].audioId)
			})

			if (result?.message === 'OK') {
				refresh()
				SuccessToast(t('ManageContent.aboutBarnahusContentSccessfullyUpdated'))

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
						{abouts && abouts[0] ? (
							<MobilePreview
								content={{ abouts: aboutToShow ? ([...aboutToShow] as any) : [] }}
								defaultContentType={'abouts'}
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
