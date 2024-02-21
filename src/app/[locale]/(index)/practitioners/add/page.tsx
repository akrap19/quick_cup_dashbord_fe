'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmAddDialog } from '@/components/overlay/confirm-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { createAdmin } from 'api/services/admins'
import { ROUTES } from 'parameters'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import PractitionerForm from '../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	barnahus: requiredString.shape.scheme,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	role: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const { push } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Practitioners.add', backLabel: 'Practitioners.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', barnahus: '', firstName: '', lastName: '', phoneNumber: '', role: '' }
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await createAdmin(data)
		if (result?.message === 'OK') {
			SuccessToast(t('Practitioners.successfullyCreated'))
			push(ROUTES.PRACTITIONERS)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<PractitionerForm />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmAddDialog
				title="Practitioners.addNew"
				description="Practitioners.addPractitionerDescription"
				buttonLabel="General.addAndInvite"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Practitioners.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default AddBarnahusPage
