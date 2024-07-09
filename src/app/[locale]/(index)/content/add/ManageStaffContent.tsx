'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { createStaff } from 'api/services/content/staff'
import { requiredString } from 'schemas'

import { StaffSectionItemsFields } from '../common/StaffSectionItemsFields'
import { TitleSubsection } from '../common/TitleSubsection'

const formSchema = z.object({
	items: z.array(
		z.object({
			images: z.array(z.string()).nonempty(),
			name: requiredString.shape.scheme,
			title: requiredString.shape.scheme,
			description: requiredString.shape.scheme
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageStaffContent = () => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language } = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: [
				{
					images: [],
					name: '',
					title: '',
					description: ''
				}
			]
		}
	})

	const formData = form?.getValues()

	// const { fields, append, remove } = useFieldArray({
	const { fields, append } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const handleAddSection = () => {
		append({
			images: [] as any,
			name: '',
			title: '',
			description: ''
		})
	}

	const onSubmit = async () => {
		const result = await createStaff({
			languageId: language?.id,
			name: formData.items[0].name,
			title: formData.items[0].title,
			description: formData.items[0].description,
			images: formData.items[0].images
		})

		// Za bulk upload, treba se popraviti na BE pa onda integrirati na FE
		// const formDataTmp: ContentPayload[] = [...formData.items]
		// formDataTmp.forEach(obj => {
		// 	obj.languageId = language?.id
		// })

		// const result = await createStaffBulk(formDataTmp)

		if (result?.message === 'OK') {
			SuccessToast(t('ManageContent.staffContentSccessfullyCreated'))

			if (currentStep) {
				setCurrentStep(currentStep + 1)
			}
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Stack gap={7}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.staff')}
							</Text>
						</Box>
						<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<TitleSubsection buttonLabel="ManageContent.addStaff" onClick={handleAddSection} />
								{fields.map((field: any, index: number) => (
									<div key={field.id}>
										{index > 0 && (
											<Box paddingBottom={6}>
												<Divider />
											</Box>
										)}
										<StaffSectionItemsFields index={index} form={form} />
									</div>
								))}
							</Stack>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
