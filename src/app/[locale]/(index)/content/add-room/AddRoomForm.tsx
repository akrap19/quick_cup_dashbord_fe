'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { requiredString } from 'schemas'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'

import { useStepsStore } from '@/store/steps'
import { SectionItemFields } from '../common/SectionItemFields'
import { Box } from '@/components/layout/box'
import { Actions } from '@/components/custom/layouts/manage-journey'
import { Language } from 'api/models/language/language'
import { useRouter } from 'next/navigation'
import { createRoom } from 'api/services/content/rooms'

interface Props {
	language: Language
}

const formSchema = z.object({
	title: requiredString.shape.scheme,
	description: requiredString.shape.scheme,
	audioId: requiredString.shape.scheme,
	images: z.array(z.string()).nonempty()
})

type Schema = z.infer<typeof formSchema>

export const AddRoomForm = ({ language }: Props) => {
	const t = useTranslations()
	const { refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()

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

	const onSubmit = async () => {
		const result = await createRoom({
			languageId: language?.languageId,
			title: formData.title,
			description: formData.description,
			images: formData.images,
			audioId: formData.audioId
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.roomBarnahusContentSccessfullyCreated'))

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
