'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useCaseJourneyStore } from '@/store/case-journey'
import { useManageContent } from '@/store/manage-content'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useStepsStore } from '@/store/steps'
import { About } from 'api/models/content/about'
import { Content } from 'api/models/content/content'
import { Room } from 'api/models/content/room'
import { Staff } from 'api/models/content/staff'
import { createCase, createCustomCase } from 'api/services/content'
import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'

interface Props {
	content: Content
}

export const PreviewAndSave = ({ content }: Props) => {
	const t = useTranslations()
	const { name, abouts, rooms, staff } = useManageContentSelection()
	const { type, customId } = useCaseJourneyStore()
	const { language } = useManageContent()
	const { currentStep, setCurrentStep } = useStepsStore()
	const searchParams = useSearchParams()
	const mergedAboutData = content?.abouts
		?.map(item => {
			const includeFlag = abouts?.find(flag => flag.aboutId === item.aboutId)

			return !includeFlag?.includeAudio && !includeFlag?.includeDescription && !includeFlag?.includeImage
				? null
				: {
						...item,
						audio: includeFlag?.includeAudio ? item.audio : undefined,
						description: includeFlag?.includeDescription ? item.description : '',
						aboutImages: includeFlag?.includeImage ? item.aboutImages : []
					}
		})
		.filter(item => item !== null)
	const mergedRoomData = content?.rooms
		?.map(item => {
			const includeFlag = rooms?.find(flag => flag.roomId === item.roomId)

			return !includeFlag?.includeAudio && !includeFlag?.includeDescription && !includeFlag?.includeImage
				? null
				: {
						...item,
						audio: includeFlag?.includeAudio ? item.audio : undefined,
						description: includeFlag?.includeDescription ? item.description : '',
						roomImages: includeFlag?.includeImage ? item.roomImages : []
					}
		})
		.filter(item => item !== null)
	const mergedStaffData = content?.staff
		?.map(item => {
			const includeFlag = staff?.find(flag => flag.staffId === item.staffId)

			return !includeFlag?.includeDescription && !includeFlag?.includeImage
				? null
				: {
						...item,
						description: includeFlag?.includeDescription ? item.description : '',
						staffImages: includeFlag?.includeImage ? item.staffImages : []
					}
		})
		.filter(item => item !== null)
	const mergedContentData: Content = {
		abouts: mergedAboutData as About[],
		rooms: mergedRoomData as Room[],
		staff: mergedStaffData as Staff[]
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let result

		if (type === CaseJourneyTypeEnum.TEMPLATE) {
			const templateId = searchParams.get('templateId')
			if (customId && templateId && language) {
				const caseJourneyData = { caseId: customId, languageId: language?.id, templateId }
				result = await createCase(caseJourneyData)
			}
		} else {
			const customCaseJourneyData = {
				caseId: customId,
				languageId: language?.id,
				name,
				abouts: abouts?.map(({ includeImage, ...rest }) => rest),
				rooms: rooms?.map(({ includeImage, ...rest }) => rest),
				staff: staff?.map(({ includeImage, ...rest }) => rest)
			}
			result = await createCustomCase(customCaseJourneyData)
		}

		if (result?.message === 'OK') {
			SuccessToast(t('CaseJourney.caseJourneySccessfullyCreated'))

			if (currentStep) {
				setCurrentStep(currentStep + 1)
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
								{t('Templates.previewAndSaveContent')}
							</Text>
						</Box>
						<Box display="flex" justify="center" textAlign="center">
							<Box style={{ maxWidth: '26rem' }}>
								<Text fontSize="small" color="neutral.800">
									{t('Templates.previewAndSaveContentDescription')}
								</Text>
							</Box>
						</Box>
					</Stack>
					<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
						<MobilePreview content={mergedContentData} />
					</Box>
				</Stack>
			</Box>
			<Actions customSubmitLabel="General.save" />
		</form>
	)
}
