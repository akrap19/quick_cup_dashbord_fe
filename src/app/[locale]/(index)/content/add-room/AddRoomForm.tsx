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
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Language } from 'api/models/language/language'
import { createRoom } from 'api/services/content/rooms'
import { ROUTES } from 'parameters'

import { SectionItemFields } from '../common/SectionItemFields'

interface Props {
	language: Language
}

const formSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	audioId: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const AddRoomForm = ({ language }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
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

	const onSubmit = async () => {
		const result = await createRoom({
			languageId: language?.languageId,
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images: formData.images,
			audioId: replaceEmptyStringWithNull(formData.audioId)
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.roomsContentSccessfullyCreated'))

			if (currentStep && totalSteps && totalSteps > currentStep) {
				setCurrentStep(currentStep + 1)
			} else {
				push(ROUTES.CONTENT)
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
