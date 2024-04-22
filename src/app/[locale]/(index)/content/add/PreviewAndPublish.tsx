import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'
import { tokens } from '@/style/theme.css'

const formSchema = z.object({
	generalIntrudactionTitle: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const PreviewAndPublish = () => {
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
									{t('ManageContent.previewAndPublishContent')}
								</Text>
							</Box>
							<Box display="flex" justify="center" textAlign="center">
								<Box style={{ maxWidth: '26rem' }}>
									<Text fontSize="small" color="neutral.800">
										{t('ManageContent.previewAndPublishContentDescription')}
									</Text>
								</Box>
							</Box>
						</Stack>
						<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
							<Box
								style={{ right: tokens.spacing[6] }}
								position="absolute"
								backgroundColor="primary.100"
								paddingY={1}
								paddingX={2}
								borderRadius="xxlarge">
								<Text fontSize="small" color="primary.900">
									English
								</Text>
							</Box>
							<Box width="100%" display="flex" justify="center">
								<Image src="/images/mobile.png" width={260} height={518} alt="https://via.placeholder.com/436x212" />
							</Box>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
