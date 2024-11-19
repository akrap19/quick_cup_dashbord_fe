'use client'

import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

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
import { Language } from 'api/models/language/language'
import { useManageContentAdd } from '@/store/manage-content-add'
import { Loader } from '@/components/custom/loader/Loader'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { Base } from 'api/models/common/base'
import { tokens } from '@/style/theme.css'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { ContentPayload } from 'api/models/content/contentPayload'
import { createStaffFull } from 'api/services/content/staff'
// import { useManageContentAdd } from '@/store/manage-content-add'
// import { LanguageLabel } from '../common/LanguageLabel'

interface Props {
	languages: Language[]
}

export const PreviewAndPublish = ({ languages }: Props) => {
	const t = useTranslations()
	const { staff, imagesToDisplay, setStaff } = useManageContentAdd()
	const { currentStep, setCurrentStep } = useStepsStore()
	const { isAllContentEmpty } = useManageContent()
	const transformedLanguageArray: Base[] = languages?.map((language: Language) => {
		return {
			id: language.languageId,
			name: language.name
		}
	})
	const [currentLanguage, setCurrentLanguage] = useState<Base>(transformedLanguageArray[0])
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
			const transformedData = {
				name: replaceEmptyStringWithNull(staff[0]?.name),
				translations: staff?.map(staffItem => ({
					languageId: replaceEmptyStringWithNull(staffItem.languageId),
					title: replaceEmptyStringWithNull(staffItem.title),
					description: replaceEmptyStringWithNull(staffItem.description)
				})),
				images: staff[staff?.length - 1]?.images || [],
				deletedImages: staff[0]?.deletedImages || []
			}

			const result = await createStaffFull(transformedData)

			if (result?.message === 'OK') {
				setStaff({} as ContentPayload)
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
						{staff && staff[0] ? (
							<>
								<Box style={{ right: tokens.spacing[5], width: '280px' }} position="absolute">
									<SearchDropdown
										name="language"
										placeholder="General.language"
										value={currentLanguage.id}
										options={transformedLanguageArray}
										isFilter
										setValue={setCurrentLanguage}
									/>
								</Box>
								<MobilePreview
									content={{ staff: staffToShow?.filter(staff => staff.languageId === currentLanguage.id) as any[] }}
									defaultContentType={'staff'}
								/>
							</>
						) : (
							// ) : isAllContentEmpty() ? (
							// 	<ManageJourneyIntroWrapper>
							// 		<NoListData
							// 			title="ManageContent.noContentToBePublishedTitle"
							// 			description="ManageContent.noContentToBePublishedDescription"
							// 			setNavbarItems={false}
							// 			buttonLabel="ManageContent.add"
							// 			onClick={() => setCurrentStep(1)}
							// 			distanceFromTop="0px"
							// 		/>
							// 	</ManageJourneyIntroWrapper>
							<Loader />
						)}
					</Box>
				</Stack>
			</Box>
			<Actions customSubmitLabel="General.publish" disableSubmit={isAllContentEmpty()} />
		</form>
	)
}
