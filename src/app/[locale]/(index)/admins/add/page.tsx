'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmAddDialog } from '@/components/overlay/confirm-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { createAdmin } from 'api/services/admins'
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
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Admins.add', backLabel: 'Admins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', firstName: '', lastName: '', phoneNumber: '' }
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await createAdmin(data)
		if (result?.message === 'OK') {
			SuccessToast(t('Admins.successfullyCreated'))
			push(ROUTES.ADMINS)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<FormItems openCancelDialog={cancelDialog.toggleOpened}>
							<FormControl name="email">
								<FormControl.Label>
									<RequiredLabel>{t('General.email')}</RequiredLabel>
								</FormControl.Label>
								<TextInput type="email" placeholder={t('General.emailPlaceholder')} />
								<FormControl.Message />
							</FormControl>
							<InputWithInfo infoText="General.barnahusInfoText">
								<FormControl name="barnahus">
									<FormControl.Label>{t('General.barnahus')}</FormControl.Label>
									<TextInput placeholder={t('General.barnahusPlaceholder')} disabled />
									<FormControl.Message />
								</FormControl>
							</InputWithInfo>
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
							<FormControl name="phoneNumber">
								<FormControl.Label>{t('General.phoneNumber')}</FormControl.Label>
								<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
								<FormControl.Message />
							</FormControl>
						</FormItems>
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmAddDialog
				title="Admins.addNew"
				description="Admins.addAdminDescription"
				buttonLabel="General.addAndInvite"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Admins.cancelAdd" />
		</>
	)
}

export default AddBarnahusPage
