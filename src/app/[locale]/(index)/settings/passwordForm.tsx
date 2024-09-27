'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { password } from 'api/services/settings'
import { passwordSchema, requiredString } from 'schemas'

const formSchema = z
	.object({
		currentPassword: requiredString.shape.scheme,
		newPassword: passwordSchema.shape.password,
		confirmPassword: requiredString.shape.scheme
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'ValidationMeseges.confirmPassword'
	})

type Schema = z.infer<typeof formSchema>

export const PasswordForm = () => {
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
	})

	const onSubmit = async (data: Schema) => {
		const result = await password(data.currentPassword, data.newPassword)
		if (result?.message === 'OK') {
			form.reset()
			SuccessToast(t('Settings.passwordSuccessfullyUpdated'))
		}
	}

	// this is because of bug on zod when password changes it dosen't matches confirm password and without this validation isn't trigered
	const { newPassword, confirmPassword } = form.watch()

	// Trigger validation on the "confirmPassword" field when the "password" field changes
	useEffect(() => {
		if (confirmPassword !== '') {
			form.trigger('confirmPassword')
		}

		// Cleans password field of required error to see info label if it is empty
		if (newPassword === '') {
			setTimeout(() => {
				form.clearErrors('newPassword')
			}, 1)
		}
	}, [newPassword])

	return (
		<Box paddingTop={6}>
			<Box padding={6} backgroundColor="neutral.50" border="thin" borderColor="neutral.300">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Stack gap={4}>
							<Box paddingRight={3} paddingBottom={7}>
								<Columns>
									<Columns.Item columns={6}>
										<Stack gap={12}>
											<FormControl name="currentPassword">
												<FormControl.Label>
													<RequiredLabel>{t('Authorization.currentPassword')}</RequiredLabel>
												</FormControl.Label>
												<PasswordInput type="password" placeholder={t('Authorization.currentPasswordPlaceholder')} />
												<FormControl.Message />
											</FormControl>
											<FormControl name="newPassword">
												<FormControl.Label>
													<RequiredLabel>{t('Authorization.newPassword')}</RequiredLabel>
												</FormControl.Label>
												<PasswordInput type="password" placeholder={t('Authorization.newPasswordPlaceholder')} />
												<FormControl.Message instructionMessage="Authorization.passwordInstructions" />
												<FormControl.Message />
											</FormControl>
											<FormControl name="confirmPassword">
												<FormControl.Label>
													<RequiredLabel>{t('Authorization.confirmPassword')}</RequiredLabel>
												</FormControl.Label>
												<PasswordInput type="password" placeholder={t('Authorization.confirmPassword')} />
												<FormControl.Message />
											</FormControl>
										</Stack>
									</Columns.Item>
								</Columns>
							</Box>
							<Divider />
							<Inline gap={4}>
								<Button variant="secondary" onClick={() => form.reset()}>
									{t('General.reset')}
								</Button>
								<Button type="submit" disabled={!form.formState.isValid}>
									{t('Settings.updatePassword')}
								</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	)
}
