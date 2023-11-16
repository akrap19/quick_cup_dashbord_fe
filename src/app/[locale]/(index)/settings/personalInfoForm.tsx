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

const formSchema = z.object({
	email: z.string().min(1, { message: 'This field is required' }),
	password: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const PersonalInfoForm = () => {
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
							<Columns gap={6}>
								<Columns.Item columns={6}>
									<Box paddingBottom={6}>
										<FormControl name="email">
											<FormControl.Label>
												<RequiredLabel>{t('General.email')}</RequiredLabel>
											</FormControl.Label>
											<TextInput placeholder={t('General.emailPlaceholder')} />
											<FormControl.Message />
										</FormControl>
									</Box>
								</Columns.Item>
								<Columns.Item columns={6}>
									<Box paddingBottom={6}>
										<FormControl name="phoneNumber">
											<FormControl.Label>{t('General.phoneNumber')}</FormControl.Label>
											<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
											<FormControl.Message />
										</FormControl>
									</Box>
								</Columns.Item>
								<Columns.Item columns={6}>
									<Box paddingBottom={6}>
										<FormControl name="firstName">
											<FormControl.Label>
												<RequiredLabel>{t('General.firstName')}</RequiredLabel>
											</FormControl.Label>
											<TextInput placeholder={t('General.firstNamePlaceholder')} />
											<FormControl.Message />
										</FormControl>
									</Box>
								</Columns.Item>
								<Columns.Item columns={6}>
									<Box paddingBottom={6}>
										<FormControl name="lastName">
											<FormControl.Label>
												<RequiredLabel>{t('General.lastName')}</RequiredLabel>
											</FormControl.Label>
											<TextInput placeholder={t('General.lastNamePlaceholder')} />
											<FormControl.Message />
										</FormControl>
									</Box>
								</Columns.Item>
							</Columns>
							<Divider />
							<Inline gap={4}>
								<Button variant="secondary">Reset</Button>
								<Button type="submit">Save changes</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	)
}
