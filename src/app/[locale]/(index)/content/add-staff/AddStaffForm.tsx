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
import { createStaff } from 'api/services/content/staff'

import { StaffSectionItemFields } from '../common/StaffSectionItemFields'

interface Props {
	language: Language
}

const formSchema = z.object({
	description: z.string().nullable(),
	name: z.string().nullable(),
	title: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const AddStaffForm = ({ language }: Props) => {
	const t = useTranslations()
	const { refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: [],
			name: '',
			title: '',
			description: ''
		}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		const result = await createStaff({
			languageId: language?.languageId,
			name: replaceEmptyStringWithNull(formData.name),
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images: formData.images
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.staffBarnahusContentSccessfullyCreated'))

			if (currentStep) {
				setCurrentStep(currentStep + 1)
			}
		}
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<StaffSectionItemFields />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
