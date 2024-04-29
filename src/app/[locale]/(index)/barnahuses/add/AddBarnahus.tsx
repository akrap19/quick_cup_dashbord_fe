'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useLoading } from '@/hooks/use-loading'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Admins } from 'api/models/admin/Admins'
import { Base } from 'api/models/common/base'
import { createBarnahus } from 'api/services/barnahuses'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import { ConfirmActionDialog } from '../../../../../components/overlay/confirm-action-dialog/ConfirmActionDialog'
import BarnahusForm from '../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	location: requiredString.shape.scheme,
	masterAdmin: z.string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	locations: Base[]
	masterAdmins: Admins[]
}

export const AddBarnahus = ({ locations, masterAdmins }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const loading = useLoading()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Barnahuses.add', backLabel: 'Barnahuses.back', cancelDialog })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', location: '', masterAdmin: '' }
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		loading.toggleLoading()
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringWithNull(data)
		const result = await createBarnahus({
			name: dataWIhoutEmptyString.name,
			location: dataWIhoutEmptyString.location,
			userId: dataWIhoutEmptyString.masterAdmin
		})

		if (result?.message === 'OK') {
			SuccessToast(t('Barnahuses.successfullyCreated'))
			push(ROUTES.BARNAHUSES)
			refresh()
		} else {
			loading.toggleLoading()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<BarnahusForm locations={locations} masterAdmins={masterAdmins} cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="Barnahuses.add"
				description="Barnahuses.addBarnahusDescription"
				buttonLabel="Barnahuses.add&Invite"
				buttonActionLoading={loading.isLoading}
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Barnahuses.cancelAdd" values={form.getValues()} />
		</>
	)
}
