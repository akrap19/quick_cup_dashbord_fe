'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useOpened } from '@/hooks/use-toggle'
import { Settings } from 'api/models/settings/settings'
import { email } from 'api/services/settings'
import { emailSchema } from 'schemas'

import { EmailVerificationDialog } from './emailVerificationDialog'

const formSchema = z.object({
	currentEmail: emailSchema.shape.email,
	newEmail: emailSchema.shape.email
})

type Schema = z.infer<typeof formSchema>

interface Props {
	settings: Settings
}

export const EmailForm = ({ settings }: Props) => {
	const t = useTranslations()
	const emailVerificationDialog = useOpened()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { currentEmail: settings.email, newEmail: '' }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await email(data.newEmail)
		if (result?.message === 'OK') {
			SuccessToast(t('Settings.verificationSuccessfullySent'))
			emailVerificationDialog.toggleOpened()
			form.reset()
		}
	}

	return (
		<Box paddingTop={6}>
			<Box padding={6} backgroundColor="neutral.50" border="thin" borderColor="neutral.300">
				<FormProvider {...form}>
					<form>
						<Stack gap={4}>
							<Box paddingRight={3} paddingBottom={7}>
								<Columns>
									<Columns.Item columns={6}>
										<Stack gap={6}>
											<Text fontSize="small" color="neutral.800">
												{t('Settings.emailInstructions')}
											</Text>
											<Stack gap={12}>
												<FormControl name="currentEmail">
													<FormControl.Label>
														<RequiredLabel>{t('Settings.currentEmail')}</RequiredLabel>
													</FormControl.Label>
													<TextInput placeholder={t('Settings.currentEmailPlaceholder')} disabled />
													<FormControl.Message />
												</FormControl>
												<FormControl name="newEmail">
													<FormControl.Label>
														<RequiredLabel>{t('Settings.newEmail')}</RequiredLabel>
													</FormControl.Label>
													<TextInput placeholder={t('Settings.newEmailPlaceholder')} />
													<FormControl.Message />
												</FormControl>
											</Stack>
										</Stack>
									</Columns.Item>
								</Columns>
							</Box>
							<Divider />
							<Inline gap={4}>
								<Button variant="secondary" onClick={() => form.reset()}>
									{t('General.reset')}
								</Button>
								<Button
									type="button"
									disabled={!form.formState.isValid}
									onClick={() => emailVerificationDialog.toggleOpened()}>
									{t('Settings.verifyNewEmail')}
								</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
			<EmailVerificationDialog emailVerificationDialog={emailVerificationDialog} onSubmit={onSubmit} />
		</Box>
	)
}
