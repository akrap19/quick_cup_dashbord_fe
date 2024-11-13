'use client'

import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'

import { Actions } from '@/components/custom/layouts/manage-journey'
// import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
// import { Loader } from '@/components/custom/loader/Loader'
// import { MobilePreview } from '@/components/custom/mobile-preview'
// import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { publishLanguage } from 'api/services/languages'
import { Language } from 'api/models/language/language'
import { useManageContentAdd } from '@/store/manage-content-add'
// import { LanguageLabel } from '../common/LanguageLabel'

interface Props {
	languages: Language[]
}

export const PreviewAndPublish = ({ languages }: Props) => {
	const t = useTranslations()
	const { abouts } = useManageContentAdd()
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language, isAllContentEmpty } = useManageContent()

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
					{/* <Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
						{content ? (
							<>
								<LanguageLabel language={language?.name} />
								<MobilePreview content={content} />
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
					</Box> */}
				</Stack>
			</Box>
			<Actions customSubmitLabel="General.publish" disableSubmit={isAllContentEmpty()} />
		</form>
	)
}
