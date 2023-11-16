'use client'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { FormWrapper, FormItems } from '@/components/custom/layouts/add-form'
import { InputInfo } from '@/components/inputs/input-info'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Box } from '@/components/layout/box'

const formSchema = z.object({
	email: z.string().min(1, { message: 'This field is required' }),
	barnahus: z.string().min(1, { message: 'This field is required' }),
	firstName: z.string().min(1, { message: 'This field is required' }),
	lastName: z.string().min(1, { message: 'This field is required' }),
	role: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const defaultValues = { email: '', barnahus: '', firstName: '', lastName: '', phoneNumber: '', role: '' }

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
						<FormControl name="email">
							<FormControl.Label>
								<RequiredLabel>{t('General.email')}</RequiredLabel>
							</FormControl.Label>
							<TextInput type="email" placeholder={t('General.emailPlaceholder')} />
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
						<FormControl name="firstName">
							<FormControl.Label>
								<RequiredLabel>{t('General.firstName')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('General.firstNamePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="lastName">
							<FormControl.Label>
								<RequiredLabel>{t('General.lastName')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('General.lastNamePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="role">
							<FormControl.Label>
								<RequiredLabel>{t('General.role')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('General.rolePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="phoneNumber">
							<FormControl.Label>{t('General.phoneNumber')}</FormControl.Label>
							<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
							<FormControl.Message />
						</FormControl>
					</FormItems>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AddBarnahusPage
