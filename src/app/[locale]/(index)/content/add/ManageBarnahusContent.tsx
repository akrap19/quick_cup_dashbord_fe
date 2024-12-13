'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { ContentPayload } from 'api/models/content/contentPayload'

import { SectionItemsFields } from '../common/SectionItemsFields'
import { TitleSubsection } from '../common/TitleSubsection'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { Audio } from 'api/models/common/audio'

const formSchema = z.object({
	items: z.array(
		z.object({
			title: z.string(),
			description: z.string(),
			audioId: z.string(),
			images: z.array(z.string())
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = () => {
	const key = 'about'
	const { currentStep, setCurrentStep } = useStepsStore()
	const {
		language,
		contentPayload,
		audioToDisplay,
		imagesToDisplay,
		setIsContentEmpty,
		setContentPayload,
		removeLastContentPayload,
		setImagesToDisplay,
		setAudioToDisplay
	} = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: contentPayload?.about
				? contentPayload?.about?.map(about => {
						return {
							title: about?.title ?? '',
							description: about?.description ?? '',
							audioId: about?.audioId ?? '',
							images: about?.images ?? []
						}
					})
				: [
						{
							title: '',
							description: '',
							audioId: '',
							images: []
						}
					]
		}
	})

	const formData = form?.getValues()

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const handleAddSection = () => {
		append({
			title: '',
			description: '',
			audioId: '',
			images: [] as any
		})
		SuccessToast(t('General.sectionAddedBelow'))
	}

	const handleRemoveSection = () => {
		// eslint-disable-next-line
		const removeIndex = formData?.items?.length - 1
		remove(removeIndex)
		removeLastContentPayload(key)
		ErrorToast(t('General.lastSectionRemoved'))
	}

	const handleNextStep = () => {
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const onSubmit = async () => {
		const formDataTmp: ContentPayload[] = [...formData.items]
		const formValuesCheck = areAllItemsEmptyInArrayObject(formDataTmp)
		formDataTmp.forEach(obj => {
			// eslint-disable-next-line
			obj.languageId = language?.id
		})

		if (!formValuesCheck) {
			setContentPayload(key, replaceEmptyStringsWithNull(formDataTmp))
			setIsContentEmpty(key, false)
		} else {
			setIsContentEmpty(key, true)
		}
		handleNextStep()
	}

	const onPhotosChange = (id: string, images: string[]) => {
		setImagesToDisplay(id + key, images)
	}

	const onAudioChange = (id: string, audio: Audio) => {
		setAudioToDisplay(id + key, audio)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Stack gap={6}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.aboutBarnahus')}
							</Text>
						</Box>
						<Box padding={6} borderTop="thin" borderColor="neutral.300">
							<Box>
								<Stack gap={4}>
									<TitleSubsection
										infoText="ManageContent.addAboutInfoText"
										showRemoveButton={formData?.items?.length > 1}
										handleAddSection={handleAddSection}
										handleRemoveSection={handleRemoveSection}
									/>
									{fields?.map((field, index) => (
										<div key={field.id}>
											<SectionItemsFields
												index={index}
												form={form}
												initialAudio={
													audioToDisplay?.find(audio => audio?.id === `items[${index}].audioId` + key)?.audio
												}
												initialImagesUrls={
													imagesToDisplay?.find(images => images?.id === `items[${index}].images` + key)?.images
												}
												onAudioChangeFull={onAudioChange}
												onPhotosChange={onPhotosChange}
											/>
											{index + 1 !== fields?.length && (
												<Box paddingTop={8}>
													<Divider />
												</Box>
											)}
										</div>
									))}
								</Stack>
							</Box>
							{/* <WorkingHours /> */}
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
