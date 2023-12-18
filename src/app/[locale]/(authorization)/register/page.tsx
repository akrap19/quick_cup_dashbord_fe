'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as z from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { register } from 'api/services/auth'
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

const RegisterPage = () => {
	const t = useTranslations()
	const { mutate: registerUser } = useMutation(register, {
		onSuccess: data => {
			console.log(data)
		},
		onError: error => {
			console.log(error)
		}
	})

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '', confirmPassword: '' }
	})

	const onSubmit = async (data: Schema) => {
		registerUser(data)
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
			}, 987)
		}
	}, [password])

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
								<TextInput placeholder={t('General.emailPlaceholder')} />
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
						<Button type="submit" variant="primary" disabled={!form.formState.isValid}>
							{t('Authorization.register')}
						</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default RegisterPage
