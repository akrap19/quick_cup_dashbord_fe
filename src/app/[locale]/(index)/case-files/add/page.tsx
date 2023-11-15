'use client'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { FormWrapper } from '@/components/custom/add-form/FormWrapper'
import { Select } from '@/components/inputs/select'
import { InputInfo } from '@/components/inputs/input-info'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { FormItems } from '@/components/custom/add-form/FormItems'
import { Box } from '@/components/layout/box'

const formSchema = z.object({
	caseId: z.string().min(1, { message: 'This field is required' }),
	status: z.string().min(1, { message: 'This field is required' }),
	barnahus: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const defaultValues = { caseId: '', status: '', barnahus: '' }

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
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
						<FormControl name="barnahus">
							<FormControl.Label>
								<RequiredLabel>{t('General.barnahus')}</RequiredLabel>
							</FormControl.Label>
							<TextInput
								placeholder={t('General.barnahusPlaceholder')}
								endIcon={
									<Box>
										<InputInfo infoText={'General.barnahusInfoText'} />
									</Box>
								}
							/>
							<FormControl.Message />
						</FormControl>
					</FormItems>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AddBarnahusPage
