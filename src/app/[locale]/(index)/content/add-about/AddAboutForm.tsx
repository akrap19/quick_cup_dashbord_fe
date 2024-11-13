'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { Language } from 'api/models/language/language'

import { SectionItemFields } from '../common/SectionItemFields'
import { useManageContentAdd } from '@/store/manage-content-add'

interface Props {
	language: Language
	languages: Language[]
}

const formSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	audioId: z.string().nullable(),
	images: z.array(z.string()),
	deletedImages: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const AddAboutForm = ({ language, languages }: Props) => {
	const { abouts } = useManageContentAdd()
	const { currentStep } = useStepsStore()
	const showInitalContent = abouts && currentStep && currentStep > 1

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: showInitalContent ? abouts[currentStep]?.title : '',
			description: showInitalContent ? abouts[currentStep]?.description : '',
			audioId: showInitalContent ? abouts[currentStep]?.audio?.audioId : '',
			images: showInitalContent ? abouts[currentStep]?.images : [],
			deletedImages: []
		}
	})

	// const formData = form?.getValues()

	const onSubmit = async () => {
		// const { audioId, images } = form.watch()
		// if (!showInitalContent && currentStep) {
		// 	const aboutForSave = { ...formData, audioId, images, languageId: language?.languageId }
		// 	setAbouts(aboutForSave)
		// 	const aboutForTranslate = { content: formData?.title, languageId: languages[currentStep]?.languageId }
		// 	// const result = await translateLanguageContent(aboutForTranslate)
		// 	// console.log('aboutForSave', languages)
		// 	// setAbouts(aboutForSave)
		// }
		// const result = await createAbout({
		// 	languageId: language?.languageId,
		// 	title: replaceEmptyStringWithNull(formData.title),
		// 	description: removeHtmlTags(formData.description) ? formData.description : null,
		// 	images: formData.images,
		// 	audioId: replaceEmptyStringWithNull(formData.audioId)
		// })
		// if (result?.message === 'OK') {
		// 	refresh()
		// 	form.reset()
		// 	SuccessToast(t('ManageContent.aboutBarnahusContentSccessfullyCreated'))
		// 	if (currentStep && totalSteps && totalSteps > currentStep) {
		// 		setCurrentStep(currentStep + 1)
		// 	} else {
		// 		push(ROUTES.CONTENT)
		// 	}
		// }
	}

	console.log('language', language)
	console.log('languages', languages)
	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<SectionItemFields />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
