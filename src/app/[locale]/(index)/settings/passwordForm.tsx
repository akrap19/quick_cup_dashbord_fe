'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
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

const formSchema = z.object({
	email: z.string().min(1, { message: 'ValidationMeseges.required' }),
	password: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const PasswordForm = () => {
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '' }
	})

	const onSubmit = async (data: Schema) => {
		console.log(data)
	}

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
								<Button variant="secondary">Reset</Button>
								<Button type="submit">Update password</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	)
}
