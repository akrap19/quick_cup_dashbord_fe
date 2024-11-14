'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { Language } from 'api/models/language/language'

import { SectionItemFields } from '../common/SectionItemFields'
import { translateLanguageContent } from 'api/services/languages'
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

export const AddRoomForm = ({ language, languages }: Props) => {
	const { rooms, setRooms } = useManageContentAdd()
	const { totalSteps, currentStep, setCurrentStep } = useStepsStore()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			audioId: '',
			images: []
		}
	})

	const formData = form?.getValues()

	type FormDataKeys = 'title' | 'description'

	const translate = async (key: FormDataKeys) => {
		if (
			((formData && formData[key] && formData[key] !== '') ||
				(rooms && rooms[0] && rooms[0][key] && rooms[0][key] !== '')) &&
			currentStep
		) {
			const forTranslate = {
				content: currentStep === 1 ? formData[key] : rooms ? rooms[0][key] : null,
				languageId: languages[currentStep]?.languageId
			}
			const translatedData = await translateLanguageContent(forTranslate)
			const translation = translatedData?.data?.translation

			form.setValue(key, translation)

			return translation
		}

		return null
	}

	const onSubmit = async () => {
		const { audioId, images } = form.watch()
		const isInitalContent = rooms && currentStep && currentStep === 1

		if (currentStep && totalSteps) {
			if (isInitalContent) {
				const aboutForSave = { ...formData, audioId, images, languageId: language?.languageId }
				setRooms(aboutForSave)
			}

			if (currentStep < languages?.length) {
				const aboutForSave = {
					title: await translate('title'),
					description: await translate('description'),
					audioId,
					images,
					languageId: language?.languageId
				}
				setRooms(aboutForSave)
			}

			setCurrentStep(currentStep + 1)
		}
	}

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
