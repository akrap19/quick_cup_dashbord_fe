import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { useJourneyContentStore } from '@/store/journey-content'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

const formSchema = z.object({
	caseId: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectBarnahusContent = () => {
	const { setCurrentStep } = useJourneyContentStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { caseId: '' }
	})

	const onSubmit = async (data: any) => {
		setCurrentStep(2)
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box padding={6} paddingBottom={8}>
					<Inline gap={1}>
						<Text color="neutral.800" fontSize="small">
							{t('General.caseId') + ':'}
						</Text>
						<Text color="neutral.800" fontSize="small" fontWeight="bold">
							{'AL-1129403'}
						</Text>
					</Inline>
					<Box display="flex" justify="center" width="100%">
						<Stack gap={6}>
							<Text color="neutral.800" fontSize="xbig" fontWeight="semibold" textAlign="center">
								{t('CaseJourney.selectBarnahusContent')}
							</Text>
							<Box
								style={{
									maxWidth: '26rem'
								}}>
								<Text color="neutral.800" fontSize="small" textAlign="center">
									{t('CaseJourney.selectBarnahusContentDescription')}
								</Text>
							</Box>
						</Stack>
					</Box>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
