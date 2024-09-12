import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Staff } from 'api/models/content/staff'
import { requiredString } from 'schemas'

import { LanguageLabel } from '../common/LanguageLabel'
import { StaffSectionItemsFields } from '../common/StaffSectionItemsFields'

interface Props {
	staff?: Staff[]
}

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

export const ManageStaffContent = ({ staff }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const { language } = useManageContent()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: staff?.map(item => {
				return {
					images: item?.staffImages?.map(image => image?.staffImageId),
					name: item?.name,
					title: item?.title,
					description: item?.description
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
								{t('General.staff')}
							</Text>
						</Box>
						<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<LanguageLabel language={language?.name} />
								{fields.map((field, index) => (
									<div key={field.id}>
										{staff && (
											<StaffSectionItemsFields
												index={index}
												form={form}
												initialImagesUrls={staff[index]?.staffImages?.map(image => image.url)}
											/>
										)}
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
