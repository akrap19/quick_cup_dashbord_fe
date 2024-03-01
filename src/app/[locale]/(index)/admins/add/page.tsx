'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { createAdmin } from 'api/services/admins'
import { ROUTES } from 'parameters'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import AdminForm from '../form'

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
						<AdminForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="Admins.addNew"
				description="Admins.addAdminDescription"
				buttonLabel="General.addAndInvite"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Admins.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default AddBarnahusPage
