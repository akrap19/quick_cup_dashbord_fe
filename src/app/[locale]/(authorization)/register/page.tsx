'use client'
import { Heading } from '@/components/typography/heading'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Stack } from '@/components/layout/stack'
import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { TextInput } from '@/components/inputs/text-input'
import { useTranslations } from 'next-intl'
import { atoms } from 'style/atoms.css'
import { PasswordInput } from '@/components/inputs/password-input'
import { RequiredLabel } from '@/components/inputs/required-label'

const formSchema = z.object({
	email: z.string().min(1, { message: 'This field is required' }),
	password: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const RegisterPage = () => {
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
								<PasswordInput type="password" placeholder={t('Authorization.newPasswordPlaceholder')} />
								<FormControl.Message />
							</FormControl>
							<FormControl name="password">
								<FormControl.Label>
									<RequiredLabel>{t('Authorization.confirmPassword')}</RequiredLabel>
								</FormControl.Label>
								<PasswordInput placeholder={t('Authorization.confirmPassword')} />
								<FormControl.Message />
							</FormControl>
						</Stack>
						<Button type="submit">{t('Authorization.register')}</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default RegisterPage
