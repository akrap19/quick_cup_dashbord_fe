'use client'

import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useStepsStore } from '@/store/steps'
import { About } from 'api/models/content/about'
import { Content } from 'api/models/content/content'
import { Room } from 'api/models/content/room'
import { Staff } from 'api/models/content/staff'
import { Template } from 'api/models/template/template'
import { createTemplate } from 'api/services/templates'

interface Props {
	templateData: Content
}

export const PreviewAndSave = ({ templateData }: Props) => {
	const t = useTranslations()
	const { name, abouts, rooms, staff, isGeneral, password, resetContent } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const mergedAboutData = templateData?.abouts
		?.map(item => {
			const includeFlag = abouts?.find(flag => flag.aboutId === item.aboutId)

			return !includeFlag?.includeAudio &&
				!includeFlag?.includeDescription &&
				(!includeFlag?.includeImage || !includeFlag?.includeImages)
				? null
				: {
						...item,
						audio: includeFlag?.includeAudio ? item.audio : undefined,
						description: includeFlag?.includeDescription ? item.description : '',
						aboutImages: includeFlag?.includeImage || includeFlag?.includeImages ? item.aboutImages : []
					}
		})
		.filter(item => item !== null)
	const mergedRoomData = templateData?.rooms
		?.map(item => {
			const includeFlag = rooms?.find(flag => flag.roomId === item.roomId)

			return !includeFlag?.includeAudio &&
				!includeFlag?.includeDescription &&
				(!includeFlag?.includeImage || !includeFlag?.includeImages)
				? null
				: {
						...item,
						audio: includeFlag?.includeAudio ? item.audio : undefined,
						description: includeFlag?.includeDescription ? item.description : '',
						roomImages: includeFlag?.includeImage || includeFlag?.includeImages ? item.roomImages : []
					}
		})
		.filter(item => item !== null)
	const mergedStaffData = templateData?.staff
		?.map(item => {
			const includeFlag = staff?.find(flag => flag.staffId === item.staffId)

			return !includeFlag?.includeDescription && !(!includeFlag?.includeImage || !includeFlag?.includeImages)
				? null
				: {
						...item,
						description: includeFlag?.includeDescription ? item.description : '',
						staffImages: includeFlag?.includeImage || includeFlag?.includeImages ? item.staffImages : []
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

		const templateData: Template = {
			name,
			isGeneral: isGeneral === 'true',
			password,
			abouts: abouts?.map(({ includeImage, ...rest }) => rest),
			rooms: rooms?.map(({ includeImage, ...rest }) => rest),
			staff: staff?.map(({ includeImage, ...rest }) => rest)
		}
		const result = await createTemplate(templateData)

		if (result?.message === 'OK') {
			SuccessToast(t('Templates.templateSccessfullyCreated'))
			resetContent()

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
