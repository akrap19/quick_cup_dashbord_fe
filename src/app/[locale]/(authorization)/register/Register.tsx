'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Stack } from '@/components/layout/stack'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { Heading } from '@/components/typography/heading'
import { useLoading } from '@/hooks/use-loading'
import { ROUTES } from 'parameters'
import { emailSchema, passwordSchema, requiredString } from 'schemas'
import { atoms } from 'style/atoms.css'

const formSchema = z
	.object({
		...emailSchema.shape,
		...passwordSchema.shape,
		confirmPassword: requiredString.shape.scheme
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'ValidationMeseges.confirmPassword'
	})

type Schema = z.infer<typeof formSchema>

interface Props {
	uid: string
	status: number
	email: string
}

const Register = ({ uid, status, email }: Props) => {
	const t = useTranslations()
	const { push } = useRouter()
	const loading = useLoading()
	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { email, password: '', confirmPassword: '' }
	})

	const onSubmit = async (data: Schema) => {
		loading.toggleLoading()
		const registerData: any = { uid, password: data.password }
		const result = await signIn('register', { ...registerData, redirect: false })

		if (result?.status === 200) {
			push(ROUTES.HOME)
		} else {
			loading.toggleLoading()
		}
	}

	// this is because of bug on zod when password changes it dosen't matches confirm password and without this validation isn't trigered
	const { password, confirmPassword } = form.watch()

	// Trigger validation on the "confirmPassword" field when the "password" field changes
	useEffect(() => {
		if (confirmPassword !== '') {
			form.trigger('confirmPassword')
		}

		// Cleans password field of required error to see info label if it is empty
		if (password === '') {
			setTimeout(() => {
				form.clearErrors('password')
			}, 1)
		}
	}, [password])

	useEffect(() => {
		if (status === 401004) {
			ErrorToast(t('ValidationMeseges.invalidRegistrationLink'))
		}
	}, [status])

	return (
		<>
			<Heading variant="h3" textTransform="uppercase">
				{t('Authorization.register')}
			</Heading>
			<FormProvider {...form}>
				<form className={atoms({ width: '100%' })} onSubmit={form.handleSubmit(onSubmit)}>
					<Stack gap={15}>
						<Stack gap={11}>
							<FormControl name="email">
								<FormControl.Label>
									<RequiredLabel>{t('General.email')}</RequiredLabel>
								</FormControl.Label>
								<TextInput placeholder={t('General.emailPlaceholder')} disabled />
								<FormControl.Message />
							</FormControl>
							<FormControl name="password">
								<FormControl.Label>
									<RequiredLabel>{t('Authorization.password')}</RequiredLabel>
								</FormControl.Label>
								<PasswordInput placeholder={t('Authorization.newPasswordPlaceholder')} />
								<FormControl.Message instructionMessage="Authorization.passwordInstructions" />
							</FormControl>
							<FormControl name="confirmPassword" successMessageString="Authorization.confirmPasswordSuccess">
								<FormControl.Label>
									<RequiredLabel>{t('Authorization.confirmPassword')}</RequiredLabel>
								</FormControl.Label>
								<PasswordInput placeholder={t('Authorization.confirmPassword')} />
								<FormControl.Message />
							</FormControl>
						</Stack>
						<Button type="submit" variant="primary" disabled={!form.formState.isValid || loading.isLoading}>
							{t(loading.isLoading ? 'General.loading' : 'Authorization.register')}
						</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default Register
