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
import { useLoading } from '@/hooks/use-loading'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Base } from 'api/models/common/base'
import { createMasterAdmin } from 'api/services/masterAdmins'
import { ROUTES } from 'parameters'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import MasterAdminForm from '../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	barnahusId: z.string().optional(),
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone
})

type Schema = z.infer<typeof formSchema>

interface Props {
	barnahuses: Base[]
}

export const MasterAdminAdd = ({ barnahuses }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const loading = useLoading()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'MasterAdmins.add', backLabel: 'MasterAdmins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '', barnahusId: '' }
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		loading.toggleLoading()
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await createMasterAdmin({ ...dataWIhoutEmptyString, barnahusId: dataWIhoutEmptyString.barnahus })

		if (result?.message === 'OK') {
			SuccessToast(t('MasterAdmins.successfullyCreated'))
			push(ROUTES.MASTER_ADMINS)
			refresh()
		} else {
			handleDialog()
			loading.toggleLoading()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<MasterAdminForm cancelDialog={cancelDialog} barnahuses={barnahuses} />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="MasterAdmins.addNew"
				description="MasterAdmins.addMasterAdminDescription"
				buttonLabel="MasterAdmins.add"
				buttonActionLoading={loading.isLoading}
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="MasterAdmins.cancelAdd" values={form.getValues()} />
		</>
	)
}
