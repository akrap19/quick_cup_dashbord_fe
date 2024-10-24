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
import { Staff } from 'api/models/content/staff'
import { updateStaff } from 'api/services/content/staff'
import { requiredString } from 'schemas'

import { StaffSectionItemFields } from '../../common/StaffSectionItemFields'

interface Props {
	staff: Staff
}

const formSchema = z.object({
	name: requiredString.shape.scheme,
	description: requiredString.shape.scheme,
	images: z.array(z.string()).nonempty()
})

type Schema = z.infer<typeof formSchema>

export const EditStaffForm = ({ staff }: Props) => {
	const t = useTranslations()
	const { refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()
	const defaultImageIds = staff?.staffImages?.map(staffImage => staffImage?.staffImageId)
	const defaultImages = staff?.staffImages?.map(staffImage => staffImage?.url)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: staff?.name,
			description: staff?.description,
			images: defaultImageIds
		}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds.filter(id => !images.includes(id))

		const result = await updateStaff({
			staffTranslationId: staff.staffTranslationId,
			name: formData.name,
			description: formData.description,
			images: formData.images,
			deletedImages
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.staffBarnahusContentSccessfullyUpdated'))

			if (currentStep) {
				setCurrentStep(currentStep + 1)
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
