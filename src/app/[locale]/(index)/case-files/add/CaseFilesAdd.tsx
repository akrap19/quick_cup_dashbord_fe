'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'

import CaseFilesForm from '../form'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { requiredString } from 'schemas'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { createCaseFile } from 'api/services/caseFiles'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ROUTES } from 'parameters'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { useOpened } from '@/hooks/use-toggle'

const formSchema = z.object({
	status: requiredString.shape.scheme,
	customId: requiredString.shape.scheme,
	barnahus: z.string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	userId?: string
	barnahus?: Barnahus
}

export const CaseFilesAdd = ({ userId, barnahus }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'CaseFiles.add', backLabel: 'CaseFiles.back' })
	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { status: '', customId: '', barnahus: barnahus?.location }
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await createCaseFile({ userId: userId ?? '', status: data.status, customId: data.customId })
		if (result?.message === 'OK') {
			SuccessToast(t('CaseFiles.successfullyCreated'))
			push(ROUTES.CASE_FILES)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<CaseFilesForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="CaseFiles.addNew"
				description="CaseFiles.addCaserDescription"
				buttonLabel="General.add"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="CaseFiles.cancelAdd" values={form.getValues()} />
		</>
	)
}
