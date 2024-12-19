'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { About } from 'api/models/content/about'

import { SectionItemFields } from '../../common/SectionItemFields'
import { LanguageLabel } from '../../common/LanguageLabel'
import { Language } from 'api/models/language/language'
import { useManageContentAdd } from '@/store/manage-content-add'
import { Audio } from 'api/models/common/audio'

interface Props {
	about: About
	language: Language
}

const formSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	audioId: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const EditAboutForm = ({ about, language }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const {
		abouts,
		imagesToDisplay,
		audioToDisplay,
		setAbouts,
		setImagesToDisplay,
		setAudioToDisplay,
		removeaudioByLanguageId,
		removeAboutsByTranslationId
	} = useManageContentAdd()
	const defaultImageIds = about?.aboutImages?.map(aboutImage => aboutImage?.aboutImageId)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues:
			abouts && abouts[0]
				? {
						title: abouts[0]?.title ?? '',
						description: abouts[0]?.description ?? '',
						audioId: abouts[0]?.audioId ?? '',
						images: abouts[0]?.images ?? []
					}
				: {
						title: about?.title ?? '',
						description: about?.description ?? '',
						audioId: about?.audio?.id ?? '',
						images: defaultImageIds ?? []
					}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds?.filter(id => !images.includes(id ?? ''))
		const aboutImageMediaIds = about.aboutImages.map(image => image.aboutImageId)
		const filteredAboutImageMediaIds = images.filter(id => !aboutImageMediaIds.includes(id))

		const aboutForEdit = {
			aboutTranslationId: about?.aboutTranslationId,
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images: filteredAboutImageMediaIds,
			deletedImages: deletedImages as any,
			audioId: replaceEmptyStringWithNull(formData.audioId)
		}

		removeAboutsByTranslationId(about?.aboutTranslationId)
		setAbouts(aboutForEdit)
		setCurrentStep(2)
	}

	const onPhotosChange = (photos: string[]) => {
		setImagesToDisplay(photos)
	}

	const onAudioChange = (audio: Audio | undefined) => {
		if (currentStep) {
			removeaudioByLanguageId(language?.languageId)
			if (audio) {
				setAudioToDisplay(language?.languageId, audio)
			}
		}
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<LanguageLabel language={language?.name} />
					<SectionItemFields
						initialAudio={audioToDisplay[0]?.audio}
						onAudioChangeFull={onAudioChange}
						initialImagesUrls={imagesToDisplay}
						onPhotosChange={onPhotosChange}
					/>
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
