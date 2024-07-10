'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { requiredString } from 'schemas'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'

import { useStepsStore } from '@/store/steps'
import { Box } from '@/components/layout/box'
import { Actions } from '@/components/custom/layouts/manage-journey'
import { useRouter } from 'next/navigation'
import { SectionItemFields } from '../../common/SectionItemFields'
import { About } from 'api/models/content/about'
import { updateAbout } from 'api/services/content/about'

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

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: about?.title,
			description: about?.description,
			audioId: '',
			images: []
		}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		const result = await updateAbout({
			aboutTranslationId: about.aboutTranslationId,
			title: formData.title,
			description: formData.description,
			images: formData.images,
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
					<SectionItemFields />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
