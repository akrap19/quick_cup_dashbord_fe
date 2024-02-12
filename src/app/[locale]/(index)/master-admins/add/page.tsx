'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { createMasterAdmin } from 'api/services/masterAdmins'
import { ROUTES } from 'parameters'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

const formSchema = z.object({
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	email: emailSchema.shape.email,
	phoneNumber: phoneNumberScheme.shape.phone
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const { push } = useRouter()
	useNavbarItems({ title: 'MasterAdmins.add', backLabel: 'MasterAdmins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '' }
	})

	const onSubmit = async (data: Schema) => {
		const result = await createMasterAdmin(data)
		if (result?.message === 'OK') {
			SuccessToast(t('MasterAdmins.successfullyCreated'))
			push(ROUTES.MASTER_ADMINS)
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormItems>
						<FormControl name="firstName">
							<FormControl.Label>
								<RequiredLabel>{t('General.firstName')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('General.firstNamePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="lastName">
							<FormControl.Label>
								<RequiredLabel>{t('General.lastName')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('General.lastNamePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="email">
							<FormControl.Label>
								<RequiredLabel>{t('General.email')}</RequiredLabel>
							</FormControl.Label>
							<TextInput type="email" placeholder={t('General.emailPlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="phoneNumber">
							<FormControl.Label>{t('General.phoneNumber')}</FormControl.Label>
							<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<Stack gap={4}>
							<Inline alignItems="center" gap={4}>
								<Label>{t('General.barnahus')}</Label>
								<InputInfo infoText="General.assignedBarnahusInfoText" />
							</Inline>
							<Text fontSize="small" color="neutral.300">
								{t('General.assignedBarnahusPlaceholder')}
							</Text>
						</Stack>
					</FormItems>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AddBarnahusPage
