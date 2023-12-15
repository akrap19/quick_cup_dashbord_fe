'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { TextInput } from '@/components/inputs/text-input'

const formSchema = z.object({
	caseId: z.string().min(1, { message: 'ValidationMeseges.required' }),
	status: z.string().min(1, { message: 'ValidationMeseges.required' }),
	barnahus: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()

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
					<FormItems>
						<FormControl name="caseId">
							<FormControl.Label>
								<RequiredLabel>{t('General.caseId')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('General.caseIdPlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="status">
							<FormControl.Label>
								<RequiredLabel>{t('General.status')}</RequiredLabel>
							</FormControl.Label>
							<Select options={[]} />
							<FormControl.Message />
						</FormControl>
						<InputWithInfo infoText="General.barnahusInfoText">
							<FormControl name="barnahus">
								<FormControl.Label>
									<RequiredLabel>{t('General.barnahus')}</RequiredLabel>
								</FormControl.Label>
								<TextInput placeholder={t('General.barnahusPlaceholder')} />
								<FormControl.Message />
							</FormControl>
						</InputWithInfo>
					</FormItems>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AddBarnahusPage
