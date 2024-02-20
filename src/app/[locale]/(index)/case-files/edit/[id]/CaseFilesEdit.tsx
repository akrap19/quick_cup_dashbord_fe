'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { CaseFile } from 'api/models/caseFiles/caseFile'
import { updateCaseFile } from 'api/services/caseFiles'
import { requiredString } from 'schemas'

import CaseFileForm from '../../form'

const formSchema = z.object({
	caseId: requiredString.shape.scheme,
	status: requiredString.shape.scheme,
	barnahus: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	caseFile: CaseFile
}

const CaseFileEdit = ({ caseFile }: Props) => {
	const t = useTranslations()
	const { back } = useRouter()
	useNavbarItems({ title: 'CaseFiles.edit', backLabel: 'CaseFiles.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { caseId: caseFile.caseId, status: caseFile.status, barnahus: caseFile.barnahus }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await updateCaseFile({ ...data, id: caseFile.id })
		if (result?.message === 'OK') {
			SuccessToast(t('CaseFiles.successfullyEdited'))
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CaseFileForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default CaseFileEdit
