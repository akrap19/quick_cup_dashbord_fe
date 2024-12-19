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
import { updateStaff } from 'api/services/content/staff'

interface Props {
	language: Language
}

export const PreviewAndPublish = ({ language }: Props) => {
	const t = useTranslations()
	const { refresh, push } = useRouter()
	const { staff, imagesToDisplay } = useManageContentAdd()
	const { isAllContentEmpty } = useManageContent()
	const staffToShow = staff?.map((staff: any) => ({
		languageId: staff.languageId,
		title: staff.title,
		description: staff.description,
		staffImages: imagesToDisplay?.map(imageUrl => ({
			url: imageUrl
		}))
	}))

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (staff) {
			const result = await updateStaff({
				staffTranslationId: staff[0]?.staffTranslationId,
				title: replaceEmptyStringWithNull(staff[0].title),
				name: replaceEmptyStringWithNull(staff[0].name),
				description: staff[0]?.description && removeHtmlTags(staff[0]?.description) ? staff[0]?.description : null,
				images: staff[0]?.images,
				deletedImages: staff[0]?.deletedImages as any
			})

			if (result?.message === 'OK') {
				refresh()
				SuccessToast(t('ManageContent.staffBarnahusContentSccessfullyUpdated'))

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
						{staff && staff[0] ? (
							<MobilePreview
								content={{ staff: staffToShow ? ([...staffToShow] as any) : [] }}
								defaultContentType={'staff'}
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
