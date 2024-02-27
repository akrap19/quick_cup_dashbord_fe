'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { Base } from 'api/models/common/base'
import { createBarnahus } from 'api/services/barnahuses'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import { ConfirmAddDialog } from '../../../../../components/overlay/confirm-add-dialog/ConfirmAddDialog'
import BarnahusForm from '../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	location: requiredString.shape.scheme,
	masterAdmin: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	locations: Base[]
	masterAdmins: Base[]
}

export const AddBarnahus = ({ locations, masterAdmins }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
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
		const data = form.getValues()
		const result = await createBarnahus({ name: data.name, location: data.location, id: data.masterAdmin })
		if (result?.message === 'OK') {
			SuccessToast(t('Barnahuses.successfullyCreated'))
			push(ROUTES.BARNAHUSES)
			refresh()
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
			<ConfirmAddDialog
				title="Barnahuses.add"
				description="Barnahuses.addBarnahusDescription"
				buttonLabel="Barnahuses.save&Add"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Barnahuses.cancelAdd" values={form.getValues()} />
		</>
	)
}
