'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Settings } from 'api/models/settings/settings'
import { personal } from 'api/services/settings'
import { requiredString } from 'schemas'

const formSchema = z.object({
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	settings: Settings
}

export const PersonalInfoForm = ({ settings }: Props) => {
	const t = useTranslations()
	const router = useRouter()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { firstName: settings.firstName, lastName: settings.lastName }
	})

	const onSubmit = async (data: Schema) => {
		const result = await personal(data.firstName, data.lastName)
		if (result?.message === 'OK') {
			router.refresh()
			SuccessToast(t('Settings.personalInfoSuccessfullyUpdated'))
		}
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
									<FormControl name="lastName">
										<FormControl.Label>
											<RequiredLabel>{t('General.lastName')}</RequiredLabel>
										</FormControl.Label>
										<TextInput placeholder={t('General.lastNamePlaceholder')} />
										<FormControl.Message />
									</FormControl>
								</Columns.Item>
								<Columns.Item columns={6}>
									<Box paddingBottom={7}>
										<FormControl name="barnahus">
											<FormControl.Label>{t('General.barnahus')}</FormControl.Label>
											<TextInput
												placeholder={t('Settings.barnahusPlacehoder')}
												defaultValue={settings.barnahus}
												disabled
											/>
											<FormControl.Message />
										</FormControl>
									</Box>
								</Columns.Item>
							</Columns>
							<Divider />
							<Inline gap={4}>
								<Button variant="secondary" onClick={() => form.reset()}>
									{t('General.reset')}
								</Button>
								<Button type="submit" disabled={!form.formState.isValid}>
									{t('General.saveChanges')}
								</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	)
}
