'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as z from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
// import { resetPassword } from 'api/services/auth'
import { useLoading } from '@/hooks/use-loading'
import { ROUTES } from 'parameters'
import { passwordSchema, requiredString } from 'schemas'
import { atoms } from 'style/atoms.css'

const formSchema = z
	.object({
		newPassword: passwordSchema.shape.password,
		confirmPassword: requiredString.shape.scheme
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'ValidationMeseges.confirmPassword'
	})

type Schema = z.infer<typeof formSchema>

const ResetYourPasswordPage = () => {
	const t = useTranslations()
	const { push } = useRouter()
	const searchParams = useSearchParams()
	const uid = searchParams.get('uid')
	const loading = useLoading()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { newPassword: '', confirmPassword: '' }
	})

	const onSubmit = async (data: Schema) => {
		loading.toggleLoading()
		const resetPasswordData: any = { uid, password: data.newPassword }
		const result = await signIn('reset-password', { ...resetPasswordData, redirect: false })

		if (result?.status === 200) {
			push(ROUTES.HOME)
		} else {
			loading.toggleLoading()
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
		<>
			<Stack gap={3}>
				<Heading variant="h3" textTransform="uppercase" textAlign="center">
					{t('Authorization.ResetYourPassword.title')}
				</Heading>
				<Text fontSize="small" textAlign="center">
					{t('Authorization.ResetYourPassword.instructions')}
				</Text>
			</Stack>
			<FormProvider {...form}>
				<form className={atoms({ width: '100%' })} onSubmit={form.handleSubmit(onSubmit)}>
					<Stack gap={15}>
						<Stack gap={11}>
							<FormControl name="newPassword">
								<FormControl.Label>
									<RequiredLabel>{t('Authorization.newPassword')}</RequiredLabel>
								</FormControl.Label>
								<PasswordInput type="password" placeholder={t('Authorization.newPasswordPlaceholder')} />
								<FormControl.Message instructionMessage="Authorization.passwordInstructions" />
							</FormControl>
							<FormControl name="confirmPassword" successMessageString="Authorization.confirmPasswordSuccess">
								<FormControl.Label>
									<RequiredLabel>{t('Authorization.confirmPassword')}</RequiredLabel>
								</FormControl.Label>
								<PasswordInput type="password" placeholder={t('Authorization.confirmPassword')} />
								<FormControl.Message />
							</FormControl>
						</Stack>
						<Button type="submit" disabled={!form.formState.isValid}>
							{t('Authorization.resetPassword')}
						</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default ResetYourPasswordPage
