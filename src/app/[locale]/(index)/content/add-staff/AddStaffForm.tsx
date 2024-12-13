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
import { useEffect, useState } from 'react'
import { ContentPayload } from 'api/models/content/contentPayload'

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
	const { staff, imagesToDisplay, setStaff, setImagesToDisplay, removeStaffByLanguageId } = useManageContentAdd()
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
		const staffItem = staff?.reduceRight<ContentPayload | null>((found, staff) => {
			return found || (staff?.languageId === languages[0]?.languageId ? staff : null)
		}, null)

		if (
			((formData && formData[key] && formData[key] !== '') ||
				(staff && staffItem && staffItem[key] && staffItem[key] !== '')) &&
			currentStep
		) {
			const forTranslate = {
				content: currentStep === 1 ? formData[key] : staff && staffItem ? staffItem[key] : null,
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
				removeStaffByLanguageId(languages[0]?.languageId)
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
				removeStaffByLanguageId(languages[currentStep]?.languageId)
				setStaff(aboutForSave)
			}

			setIsTranslating(false)
			setCurrentStep(currentStep + 1)
		}
	}

	const onPhotosChange = (photos: string[]) => {
		setImagesToDisplay(photos)
	}

	const handleResetForm = (indexOffset: number) => {
		if (currentStep && staff && staff[currentStep - indexOffset]) {
			const staffItem = staff?.reduceRight<ContentPayload | null>((found, staff) => {
				return found || (staff?.languageId === languages[currentStep - indexOffset]?.languageId ? staff : null)
			}, null)

			form.reset({
				title: staffItem?.title ?? '',
				description: staffItem?.description ?? '',
				name: staffItem?.name ?? '',
				images: staffItem?.images ?? [],
				deletedImages: staffItem?.deletedImages ?? []
			})
		}
	}

	const handleBack = () => {
		if (currentStep) {
			handleResetForm(2)
			setCurrentStep(currentStep - 1)
		}
	}

	useEffect(() => {
		handleResetForm(1)
	}, [])

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<StaffSectionItemFields
						includePhotoInfo={true}
						initialImagesUrls={imagesToDisplay}
						onPhotosChange={onPhotosChange}
					/>
					<Actions disableSubmit={istranslating} customHandleBack={handleBack} />
				</form>
			</FormProvider>
		</Box>
	)
}
