'use client'
import { Heading } from '@/components/typography/heading'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Stack } from '@/components/layout/stack'
import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { TextInput } from '@/components/inputs/text-input'
import { Inline } from '@/components/layout/inline'
import { Checkbox } from '@/components/inputs/checkbox'
import { useTranslations } from 'next-intl'
import { atoms } from 'style/atoms.css'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'

const formSchema = z.object({
	email: z.string().min(1, { message: 'This field is required' }),
	password: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const LoginPage = () => {
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
								<FormControl name="password">
									<FormControl.Label>
										<RequiredLabel>{t('Authorization.password')}</RequiredLabel>
									</FormControl.Label>
									<PasswordInput type="password" placeholder={t('Authorization.passwordPlaceholder')} />
									<FormControl.Message />
								</FormControl>
							</Stack>
							<Inline justifyContent="space-between">
								<Checkbox name="remeberMe" label="Remeber me" />
								<Button variant="ghost" size="small">
									{t('Authorization.forgotPassword')}
								</Button>
							</Inline>
						</Stack>
						<Button type="submit">{t('Authorization.logIn')}</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default LoginPage
