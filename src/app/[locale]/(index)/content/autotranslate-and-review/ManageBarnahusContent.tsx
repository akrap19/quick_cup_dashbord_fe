'use client'

import { useRouter } from 'next/navigation'
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
import { createAboutBulk } from 'api/services/content/about'

import { LanguageLabel } from '../common/LanguageLabel'
import { SectionItemsFields } from '../common/SectionItemsFields'
import { ContentPayload } from 'api/models/content/contentPayload'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'

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
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language, setIsContentEmpty } = useManageContent()
	const { refresh } = useRouter()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: abouts?.map(about => {
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

	const formData = form?.getValues()

	const { fields } = useFieldArray({
		control: form.control,
		name: 'items'
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

		const deletedImagesIds = aboutImagesIds?.filter(id => !imagesIds?.includes(id))

		return deletedImagesIds
	}

	const onSubmit = async () => {
		const formDataTmp: ContentPayload[] = [...formData.items]
		const formValuesCheck = areAllItemsEmptyInArrayObject(formDataTmp)
		formDataTmp.forEach(obj => {
			// eslint-disable-next-line
			obj.languageId = language?.id
			// eslint-disable-next-line
			obj.deletedImages = handleDeletedAboutImagesId(obj.aboutId, obj.images)
			// eslint-disable-next-line
			obj.images = handleAboutImagesId(obj.aboutId, obj.images)
		})

		if (!formValuesCheck) {
			const result = await createAboutBulk(replaceEmptyStringsWithNull(formDataTmp))

			if (result?.message === 'OK') {
				SuccessToast(t('ManageContent.aboutBarnahusContentSccessfullyCreated'))

				refresh()
				setIsContentEmpty('about', false)
				handleNextStep()
			}
		} else {
			setIsContentEmpty('about', true)
			handleNextStep()
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Stack gap={7}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.aboutBarnahus')}
							</Text>
						</Box>
						<Box paddingY={4} paddingX={5} borderTop="thin" borderColor="neutral.300">
							<Box>
								<Stack gap={4}>
									<LanguageLabel language={language?.name} />
									{fields.map((field, index) => (
										<div key={field.id}>
											{abouts && (
												<SectionItemsFields
													index={index}
													form={form}
													initialAudio={{
														id: abouts[index]?.audio?.audioId ?? '',
														name: abouts[index]?.audio?.audioName ?? '',
														url: abouts[index]?.audio?.audioURL ?? ''
													}}
													initialImagesUrls={abouts[index]?.aboutImages?.map(image => image.url)}
												/>
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
