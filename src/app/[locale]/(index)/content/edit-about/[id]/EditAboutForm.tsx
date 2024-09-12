'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useStepsStore } from '@/store/steps'
import { About } from 'api/models/content/about'
import { updateAbout } from 'api/services/content/about'
import { requiredString } from 'schemas'

import { SectionItemFields } from '../../common/SectionItemFields'

interface Props {
	about: About
}

const formSchema = z.object({
	title: requiredString.shape.scheme,
	description: requiredString.shape.scheme,
	audioId: requiredString.shape.scheme,
	images: z.array(z.string()).nonempty()
})

type Schema = z.infer<typeof formSchema>

export const EditAboutForm = ({ about }: Props) => {
	const t = useTranslations()
	const { refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()
	const defaultImageIds = about?.aboutImages?.map(aboutImage => aboutImage?.aboutImageId)
	const defaultImages = about?.aboutImages?.map(aboutImage => aboutImage?.url)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: about?.title,
			description: about?.description,
			audioId: about?.audio?.id,
			images: defaultImageIds
		}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds.filter(id => !images.includes(id))

		const result = await updateAbout({
			aboutTranslationId: about.aboutTranslationId,
			title: formData.title,
			description: formData.description,
			images,
			deletedImages,
			audioId: formData.audioId
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.aboutBarnahusContentSccessfullyCreated'))

			if (currentStep) {
				setCurrentStep(currentStep + 1)
			}
		}
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<SectionItemFields initialAudio={about?.audio} initialImagesUrls={defaultImages} />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
