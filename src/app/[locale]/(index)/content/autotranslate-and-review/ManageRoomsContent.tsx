import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Room } from 'api/models/content/room'
import { requiredString } from 'schemas'

import { LanguageLabel } from '../common/LanguageLabel'
import { SectionItemsFields } from '../common/SectionItemsFields'

interface Props {
	rooms?: Room[]
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

export const ManageRoomsContent = ({ rooms }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const { language } = useManageContent()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: rooms?.map(room => {
				return {
					title: room?.title,
					description: room?.description,
					audioId: '',
					images: room?.roomImages?.map(image => image?.roomImageId)
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
					<Stack gap={6}>
						<Stack gap={4}>
							<Box display="flex" justify="center">
								<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
									{t('General.rooms')}
								</Text>
							</Box>
						</Stack>
						<Box padding={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<LanguageLabel language={language?.name} />
								{fields.map((field, index) => (
									<div key={field.id}>
										{rooms && (
											<SectionItemsFields
												index={index}
												form={form}
												initialImagesUrls={rooms[index]?.roomImages?.map(image => image.url)}
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
