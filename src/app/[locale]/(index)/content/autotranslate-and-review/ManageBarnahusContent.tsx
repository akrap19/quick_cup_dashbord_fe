'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { About } from 'api/models/content/about'

import { LanguageLabel } from '../common/LanguageLabel'
import { SectionItemsFields } from '../common/SectionItemsFields'
import { ContentPayload } from 'api/models/content/contentPayload'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { Audio } from 'api/models/common/audio'
import { Divider } from '@/components/layout/divider'

interface Props {
	abouts?: About[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			aboutId: z.string(),
			title: z.string(),
			description: z.string(),
			audioId: z.string(),
			images: z.array(z.string()),
			deletedImages: z.array(z.string())
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = ({ abouts }: Props) => {
	const key = 'about'
	const { currentStep, setCurrentStep } = useStepsStore()
	const {
		language,
		contentPayload,
		audioToDisplay,
		imagesToDisplay,
		setIsContentEmpty,
		setContentPayload,
		setImagesToDisplay,
		setAudioToDisplay
	} = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: contentPayload?.about
				? contentPayload?.about?.map((about, index) => {
						return {
							aboutId: (abouts && abouts[index]?.aboutId) ?? '',
							title: about?.title ?? '',
							description: about?.description ?? '',
							audioId: about?.audioId ?? '',
							images: about?.images ?? [],
							deletedImages: about?.deletedImages ?? []
						}
					})
				: abouts?.map(about => {
						return {
							aboutId: about?.aboutId ?? '',
							title: about?.title ?? '',
							description: about?.description ?? '',
							audioId: about?.audio?.audioId ?? '',
							images: about?.aboutImages?.map(image => image?.aboutImageId) ?? [],
							deletedImages: []
						}
					})
		}
	})

	const handleNextStep = () => {
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleAboutImagesId = (aboutId?: string, imagesIds?: string[]) => {
		const aboutImagesIds = abouts
			?.find(about => about?.aboutId === aboutId)
			?.aboutImages?.map(image => image?.aboutImageId)
		const newImagesIds = imagesIds?.filter(id => !aboutImagesIds?.includes(id))

		return newImagesIds
	}

	const handleDeletedAboutImagesId = (aboutId?: string, imagesIds?: string[]) => {
		const aboutImagesIds = abouts
			?.find(about => about?.aboutId === aboutId)
			?.aboutImages?.map(image => image?.aboutImageId)

		const deletedImagesIds = aboutImagesIds?.filter(id => !imagesIds?.includes(id ?? ''))

		return deletedImagesIds
	}

	const onSubmit = async () => {
		const formDataTmp: ContentPayload[] = [...getValues('items')]
		const formValuesCheck = areAllItemsEmptyInArrayObject(formDataTmp)
		formDataTmp.forEach(obj => {
			// eslint-disable-next-line
			obj.languageId = language?.id
			// eslint-disable-next-line
			obj.deletedImages = handleDeletedAboutImagesId(obj.aboutId, obj.images) as any
			// eslint-disable-next-line
			obj.images = handleAboutImagesId(obj.aboutId, obj.images)
		})

		if (!formValuesCheck) {
			setContentPayload(key, replaceEmptyStringsWithNull(formDataTmp))
			setIsContentEmpty(key, false)
		} else {
			setIsContentEmpty(key, true)
		}
		handleNextStep()
	}

	const { getValues, control, handleSubmit } = form

	const { fields } = useFieldArray({
		control,
		name: 'items'
	})

	const onPhotosChange = (id: string, images: string[]) => {
		setImagesToDisplay(id + key, images)
	}

	const onAudioChange = (id: string, audio: Audio) => {
		setAudioToDisplay(id + key, audio)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
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
									<LanguageLabel language={language?.name} />
									{fields.map((field, index) => (
										<div key={field.id}>
											{abouts && (
												<SectionItemsFields
													index={index}
													form={form}
													initialAudio={
														audioToDisplay?.find(audio => audio?.id === `items[${index}].audioId` + key)?.audio ?? {
															id: abouts[index]?.audio?.audioId ?? '',
															name: abouts[index]?.audio?.audioName ?? '',
															url: abouts[index]?.audio?.audioURL ?? ''
														}
													}
													initialImagesUrls={
														imagesToDisplay?.find(images => images?.id === `items[${index}].images` + key)?.images ??
														abouts[index]?.aboutImages?.map(image => image.url)
													}
													onAudioChangeFull={onAudioChange}
													onPhotosChange={onPhotosChange}
												/>
											)}
											{index + 1 !== fields?.length && (
												<Box paddingTop={8}>
													<Divider />
												</Box>
											)}
										</div>
									))}
								</Stack>
							</Box>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
