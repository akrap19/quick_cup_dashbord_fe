'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { createAbout } from 'api/services/content/about'
import { requiredString } from 'schemas'

import { SectionItemsFields } from '../common/SectionItemsFields'
import { TitleSubsection } from '../common/TitleSubsection'
import { WorkingHours } from '../common/WorkingHours'

const formSchema = z.object({
	items: z.array(
		z.object({
			title: requiredString.shape.scheme,
			description: requiredString.shape.scheme,
			audioId: requiredString.shape.scheme,
			images: z.array(z.string()).nonempty()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = () => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language } = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: [
				{
					title: '',
					description: '',
					audioId: '',
					images: []
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
			title: '',
			description: '',
			audioId: '',
			images: [] as any
		})
	}

	const onSubmit = async () => {
		const result = await createAbout({
			languageId: language?.id,
			title: formData.items[0].title,
			description: formData.items[0].description,
			images: formData.items[0].images,
			audioId: formData.items[0].audioId
		})

		// Za bulk upload, treba se popraviti na BE pa onda integrirati na FE
		// const formDataTmp: ContentPayload[] = [...formData.items]
		// formDataTmp.forEach(obj => {
		// 	obj.languageId = language?.id
		// })

		// const result = await createAboutBulk(formDataTmp)

		if (result?.message === 'OK') {
			SuccessToast(t('ManageContent.aboutBarnahusContentSccessfullyCreated'))

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
								{t('General.aboutBarnahus')}
							</Text>
						</Box>
						<Box paddingY={4} paddingX={5} borderTop="thin" borderColor="neutral.300">
							<Box>
								<Stack gap={4}>
									<TitleSubsection
										buttonLabel="ManageContent.addAbout"
										infoText="ManageContent.addAboutInfoText"
										onClick={handleAddSection}
									/>
									{fields.map((field, index) => (
										<div key={field.id}>
											<SectionItemsFields index={index} form={form} />
										</div>
									))}
								</Stack>
							</Box>
							<WorkingHours />
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
