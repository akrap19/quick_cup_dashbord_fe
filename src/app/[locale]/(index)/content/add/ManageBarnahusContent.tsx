'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'

import { SectionItemFields } from '../common/SectionItemFields'
import { TitleSubsection } from '../common/TitleSubsection'
import { WorkingHours } from '../common/WorkingHours'
import { requiredString } from 'schemas'

const formSchema = z.object({
	items: z.array(
		z.object({
			generalIntroductionTitle: requiredString.shape.scheme,
			generalIntroductionDescription: requiredString.shape.scheme,
			audioTranslate: z.string().optional(),
			photos: z.array(z.string()).optional()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = () => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: [
				{
					generalIntroductionTitle: '',
					generalIntroductionDescription: '',
					audioTranslate: '',
					photos: []
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
			generalIntroductionTitle: '',
			generalIntroductionDescription: '',
			audioTranslate: '',
			photos: []
		})
	}

	const onSubmit = async () => {
		console.log('formdata', formData)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
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
											<SectionItemFields index={index} form={form} />
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
