'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'

import CaseFilesForm from '../form'

const formSchema = z.object({
	caseId: z.string().min(1, { message: 'ValidationMeseges.required' }),
	status: z.string().min(1, { message: 'ValidationMeseges.required' }),
	barnahus: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

const AddCaseFilesPage = () => {
	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { caseId: '', status: '', barnahus: '' }
	})

	const onSubmit = async (data: Schema) => {
		console.log(data)
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CaseFilesForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AddCaseFilesPage
