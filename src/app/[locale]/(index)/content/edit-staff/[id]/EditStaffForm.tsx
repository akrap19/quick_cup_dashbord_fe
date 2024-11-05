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
import { Staff } from 'api/models/content/staff'
import { updateStaff } from 'api/services/content/staff'
import { ROUTES } from 'parameters'

import { StaffSectionItemFields } from '../../common/StaffSectionItemFields'

interface Props {
	staff: Staff
}

const formSchema = z.object({
	description: z.string().nullable(),
	name: z.string().nullable(),
	title: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const EditStaffForm = ({ staff }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const { totalSteps, currentStep, setCurrentStep } = useStepsStore()
	const defaultImageIds = staff?.staffImages?.map(staffImage => staffImage?.staffImageId)
	const defaultImages = staff?.staffImages?.map(staffImage => staffImage?.url)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: staff?.description ?? '',
			name: staff?.name ?? '',
			title: staff?.title ?? '',
			images: defaultImageIds ?? []
		}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds?.filter(id => !images.includes(id))

		const result = await updateStaff({
			staffTranslationId: staff?.staffTranslationId,
			name: replaceEmptyStringWithNull(formData.name),
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images: formData.images,
			deletedImages
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.staffBarnahusContentSccessfullyUpdated'))

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
					<StaffSectionItemFields initialImagesUrls={defaultImages} />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
