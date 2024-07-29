'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'

import { LanguageLabel } from '../common/LanguageLabel'
import { WorkingHours } from '../common/WorkingHours'
import { useManageContent } from '@/store/manage-content'

const formSchema = z.object({})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = () => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const { content } = useManageContent()

	console.log('content', content)

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
					<Stack gap={7}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.aboutBarnahus')}
							</Text>
						</Box>
						<Box paddingY={4} paddingX={5} borderTop="thin" borderColor="neutral.300">
							<Box paddingBottom={6} borderBottom="thin" borderColor="neutral.300">
								<Stack gap={4}>
									<LanguageLabel />
									{/* <SectionItemsFields /> */}
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
