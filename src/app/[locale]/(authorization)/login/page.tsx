'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/inputs/button'
import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { ROUTES } from 'parameters'
import { emailSchema, requiredString } from 'schemas'
import { atoms } from 'style/atoms.css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useLoading } from '@/hooks/use-loading'

const formSchema = z.object({
	...emailSchema.shape,
	// ...passwordSchema.shape,
	password: requiredString.shape.scheme,
	remeberMe: z.boolean()
})

type Schema = z.infer<typeof formSchema>

const LoginPage = () => {
	const t = useTranslations()
	const { push } = useRouter()
	const loading = useLoading()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '', remeberMe: false }
	})

	const onSubmit = async (data: Schema) => {
		loading.toggleLoading()
		const result = await signIn('login', { ...data, redirect: false })

		if (result?.status === 200) {
			push(ROUTES.HOME)
		} else {
			loading.toggleLoading()
			form.setError('email', {
				type: 'manual'
			})
			form.setError('password', {
				type: 'manual',
				message: 'Authorization.invalidLogin'
			})
		}
	}

	useEffect(() => {
		if (form.formState.isValid && Object.keys(form.formState.errors).length > 0) {
			form.clearErrors()
		}
	}, [form.formState.isValid])

	return (
		<>
			<Heading variant="h3" textTransform="uppercase">
				{t('Authorization.logIn')}
			</Heading>
			<FormProvider {...form}>
				<form className={atoms({ width: '100%' })} onSubmit={form.handleSubmit(onSubmit)}>
					<Stack gap={6}>
						<Stack gap={10}>
							<Stack gap={11}>
								<FormControl name="email">
									<FormControl.Label>
										<RequiredLabel>{t('General.email')}</RequiredLabel>
									</FormControl.Label>
									<TextInput placeholder={t('General.emailPlaceholder')} />
									<FormControl.Message />
								</FormControl>
								<FormControl
									name="password"
									successMessageString={form.formState.isValid ? 'Authorization.allGood' : undefined}>
									<FormControl.Label>
										<RequiredLabel>{t('Authorization.password')}</RequiredLabel>
									</FormControl.Label>
									<PasswordInput type="password" placeholder={t('Authorization.passwordPlaceholder')} />
									<FormControl.Message />
								</FormControl>
							</Stack>
							<Inline justifyContent="space-between" alignItems="center">
								<FormControl name="remeberMe">
									<Checkbox checked={form.watch('remeberMe')} label={t('Authorization.remeberMe')} />
								</FormControl>
								<Button variant="adaptive" href={ROUTES.FORGOT_PASSWORD} size="small">
									{t('Authorization.forgotPassword')}
								</Button>
							</Inline>
						</Stack>
						<Button type="submit" disabled={!form.formState.isValid || loading.isLoading}>
							{loading.isLoading ? 'Loading...' : t('Authorization.logIn')}
						</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default LoginPage
