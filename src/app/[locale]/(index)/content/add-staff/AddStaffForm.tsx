'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { Language } from 'api/models/language/language'

import { StaffSectionItemFields } from '../common/StaffSectionItemFields'
import { translateLanguageContent } from 'api/services/languages'
import { useManageContentAdd } from '@/store/manage-content-add'
import { useState } from 'react'

interface Props {
	languages: Language[]
}

const formSchema = z.object({
	description: z.string().nullable(),
	name: z.string().nullable(),
	title: z.string().nullable(),
	images: z.array(z.string()),
	deletedImages: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const AddStaffForm = ({ languages }: Props) => {
	const { staff, setStaff, setImagesToDisplay } = useManageContentAdd()
	const [istranslating, setIsTranslating] = useState(false)
	const { totalSteps, currentStep, setCurrentStep } = useStepsStore()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: [],
			name: '',
			title: '',
			description: '',
			deletedImages: []
		}
	})

	const formData = form?.getValues()

	type FormDataKeys = 'title' | 'description' | 'name'

	const translate = async (key: FormDataKeys) => {
		if (
			((formData && formData[key] && formData[key] !== '') ||
				(staff && staff[0] && staff[0][key] && staff[0][key] !== '')) &&
			currentStep
		) {
			const forTranslate = {
				content: currentStep === 1 ? formData[key] : staff ? staff[0][key] : null,
				languageId: languages[currentStep]?.languageId
			}
			const translatedData = await translateLanguageContent(forTranslate)
			const translation = translatedData?.data?.translation

			form.setValue(key, translation)

			return translation
		}

		return ''
	}

	const onSubmit = async () => {
		const { name, images } = form.watch()
		setIsTranslating(true)
		const isInitalContent = staff && currentStep && currentStep === 1

		if (currentStep && totalSteps) {
			if (isInitalContent) {
				const aboutForSave = { ...formData, images, languageId: languages[0]?.languageId }
				setStaff(aboutForSave)
			}

			if (currentStep < languages?.length) {
				const aboutForSave = {
					title: await translate('title'),
					description: await translate('description'),
					name,
					images,
					languageId: languages[currentStep]?.languageId
				}
				setStaff(aboutForSave)
			}

			setIsTranslating(false)
			setCurrentStep(currentStep + 1)
		}
	}

	const onPhotosChange = (photos: string[]) => {
		setImagesToDisplay(photos)
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<StaffSectionItemFields includePhotoInfo={true} onPhotosChange={onPhotosChange} />
					<Actions disableSubmit={istranslating} />
				</form>
			</FormProvider>
		</Box>
	)
}
