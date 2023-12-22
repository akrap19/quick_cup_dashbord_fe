'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { TextInput } from '@/components/inputs/text-input'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { forgotPassword } from 'api/services/auth'
import { emailSchema } from 'schemas'
import { atoms } from 'style/atoms.css'

const formSchema = z.object({
	...emailSchema.shape
})

type Schema = z.infer<typeof formSchema>

const ForgotPasswordPage = () => {
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { email: '' }
	})

	const onSubmit = async (data: Schema) => {
		forgotPassword(data.email)
	}

	return (
		<>
			<Stack gap={3}>
				<Heading variant="h3" textTransform="uppercase" textAlign="center">
					{t('Authorization.forgotPassword')}
				</Heading>
				<Text fontSize="small" textAlign="center">
					{t('Authorization.ForgotPassword.instructions')}
				</Text>
			</Stack>
			<FormProvider {...form}>
				<form className={atoms({ width: '100%' })} onSubmit={form.handleSubmit(onSubmit)}>
					<Stack gap={8}>
						<FormControl name="email">
							<FormControl.Label>{t('General.email')}</FormControl.Label>
							<TextInput placeholder={t('General.emailPlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<Button type="submit" disabled={!form.formState.isValid}>
							{t('Authorization.ForgotPassword.sendInstructions')}
						</Button>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}

export default ForgotPasswordPage
