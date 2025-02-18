'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'
import { passwordSchema } from 'schemas'
import { PasswordInput } from '@/components/inputs/password-input'
import { useManageContentSelection } from '@/store/manage-content-selection'

const formSchema = z.object({
	...passwordSchema.shape
})

type Schema = z.infer<typeof formSchema>

export const SetTemplatePassword = () => {
	const { setPassword } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {}
	})

	const { password } = form.watch()

	const onSubmit = async () => {
		setPassword(password)

		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Box paddingX={6} paddingTop={6}>
						<ManageJourneyIntroWrapper>
							<Stack gap={6} alignItems="center">
								<Text fontSize="xbig" fontWeight="semibold" textAlign="center" color="neutral.800">
									{t('Templates.setTemplatePasswordTitle')}
								</Text>
								<Text fontSize="small" color="neutral.800" textAlign="center">
									{t('Templates.setTemplatePasswordDescription')}
								</Text>
								<Box width="100%">
									<FormControl name="password">
										<PasswordInput />
										<FormControl.Message instructionMessage="Authorization.passwordInstructions" />
									</FormControl>
								</Box>
							</Stack>
						</ManageJourneyIntroWrapper>
					</Box>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
