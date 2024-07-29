'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { CaseFile } from 'api/models/caseFiles/caseFile'
import { requiredString } from 'schemas'

import CaseFileForm from '../../form'
import { updateCaseFile } from 'api/services/caseFiles'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'

const formSchema = z.object({
	status: requiredString.shape.scheme,
	customId: requiredString.shape.scheme,
	barnahus: z.string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	caseFile: CaseFile
}

const CaseFileEdit = ({ caseFile }: Props) => {
	const t = useTranslations()
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'CaseFiles.edit', backLabel: 'CaseFiles.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { customId: caseFile.customId, status: caseFile.status, barnahus: caseFile.barnahus }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await updateCaseFile({ ...data, caseId: caseFile.caseId })
		if (result?.message === 'OK') {
			SuccessToast(t('CaseFiles.successfullyEdited'))
			back()
			refresh()
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
