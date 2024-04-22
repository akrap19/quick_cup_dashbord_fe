import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'

import { SectionItemFields } from './common/SectionItemFields'
import { TitleSubsection } from './common/TitleSubsection'

const formSchema = z.object({
	generalIntrudactionTitle: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const ManageRoomsContent = () => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { generalIntrudactionTitle: '' }
	})
	const formData = form?.getValues()

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
							<Box display="flex" justify="center" textAlign="center">
								<Box style={{ maxWidth: '26rem' }}>
									<Text fontSize="small" color="neutral.800">
										{t('ManageContent.roomsDescription')}
									</Text>
								</Box>
							</Box>
						</Stack>
						<Box padding={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<TitleSubsection buttonLabel="ManageContent.addRoom" infoText="ManageContent.addRoomInfoText" />
								<SectionItemFields />
							</Stack>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
