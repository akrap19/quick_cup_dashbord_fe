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

import { LanguageLabel } from '../common/LanguageLabel'
import { WorkingHours } from '../common/WorkingHours'
import { About } from 'api/models/content/about'
import { requiredString } from 'schemas'
import { SectionItemsFields } from '../common/SectionItemsFields'
import { useManageContent } from '@/store/manage-content'

interface Props {
	abouts?: About[]
}

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

export const ManageBarnahusContent = ({ abouts }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const { language } = useManageContent()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: abouts?.map(about => {
				return {
					title: about?.title,
					description: about?.description,
					audioId: '',
					images: about?.aboutImages?.map(image => image?.aboutImageId)
				}
			})
		}
	})

	const formData = form?.getValues()

	const { fields } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const onSubmit = async () => {
		console.log('data', formData)
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
									<LanguageLabel language={language?.name} />
									{fields.map((field, index) => (
										<div key={field.id}>
											{abouts && (
												<SectionItemsFields
													index={index}
													form={form}
													initialImagesUrls={abouts[index]?.aboutImages?.map(image => image.url)}
												/>
											)}
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
