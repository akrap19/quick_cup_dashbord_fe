'use client'

import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Content } from 'api/models/content/content'
import { publishLanguage } from 'api/services/languages'

import { LanguageLabel } from './LanguageLabel'

interface Props {
	content: Content
}

export const PreviewAndPublish = ({ content }: Props) => {
	const t = useTranslations()
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language } = useManageContent()

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (language) {
			const result = await publishLanguage(language?.id)

			if (result?.message === 'OK') {
				SuccessToast(t('ManageContent.contentSuccessfullyPublished'))

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
						<LanguageLabel language={language?.name} />
						<MobilePreview content={content} />
					</Box>
				</Stack>
			</Box>
			<Actions customSubmitLabel="General.publish" />
		</form>
	)
}
