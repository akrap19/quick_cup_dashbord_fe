'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Staff } from 'api/models/content/staff'

import { StaffSectionItemFields } from '../../common/StaffSectionItemFields'
import { LanguageLabel } from '../../common/LanguageLabel'
import { Language } from 'api/models/language/language'
import { useManageContentAdd } from '@/store/manage-content-add'

interface Props {
	staffItem: Staff
	language: Language
}

const formSchema = z.object({
	description: z.string().nullable(),
	name: z.string().nullable(),
	title: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const EditStaffForm = ({ staffItem, language }: Props) => {
	const { setCurrentStep } = useStepsStore()
	const { staff, imagesToDisplay, setStaff, setImagesToDisplay, removeAboutsByTranslationId } = useManageContentAdd()
	const defaultImageIds = staffItem?.staffImages?.map(staffImage => staffImage?.staffImageId)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues:
			staff && staff[0]
				? {
						title: staff[0]?.title ?? '',
						description: staff[0]?.description ?? '',
						name: staff[0]?.name ?? '',
						images: staff[0]?.images ?? []
					}
				: {
						description: staffItem?.description ?? '',
						name: staffItem?.name ?? '',
						title: staffItem?.title ?? '',
						images: defaultImageIds ?? []
					}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds?.filter(id => !images.includes(id))

		const aboutForEdit = {
			staffTranslationId: staffItem?.staffTranslationId,
			name: replaceEmptyStringWithNull(formData.name),
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images: formData.images,
			deletedImages
		}

		removeAboutsByTranslationId(staffItem?.staffTranslationId)
		setStaff(aboutForEdit)
		setCurrentStep(2)
	}

	const onPhotosChange = (photos: string[]) => {
		setImagesToDisplay(photos)
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<LanguageLabel language={language?.name} />
					<StaffSectionItemFields initialImagesUrls={imagesToDisplay} onPhotosChange={onPhotosChange} />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
