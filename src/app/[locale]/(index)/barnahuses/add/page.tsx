'use client'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { FormWrapper, FormItems } from '@/components/custom/add-form'
import { Select } from '@/components/inputs/select'
import { Text } from '@/components/typography/text'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { InputInfo } from '@/components/inputs/input-info'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Inline } from '@/components/layout/inline'
import { useNavbarItems } from '@/hooks/use-navbar-items'

const formSchema = z.object({
	barnahusName: z.string().min(1, { message: 'This field is required' }),
	barnahusLocation: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	useNavbarItems({ title: 'Barnahuses.add', backLabel: 'barnahuses' })
	const defaultValues = { barnahusName: '', barnahusLocation: '' }

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
						<FormControl name="barnahusName">
							<FormControl.Label>
								<RequiredLabel>{t('Barnahuses.barnahusName')}</RequiredLabel>
							</FormControl.Label>
							<TextInput placeholder={t('Barnahuses.barnahusNamePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="barnahusLocation">
							<FormControl.Label>
								<RequiredLabel>{t('Barnahuses.barnahusLocation')}</RequiredLabel>
							</FormControl.Label>
							<Select options={[]} placeholder={t('Barnahuses.emailPlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<Stack gap={4}>
							<Inline alignItems="center" gap={4}>
								<Label>{t('Barnahuses.assignedMasterAdmin')}</Label>
								<InputInfo infoText={'Barnahuses.assignedMasterAdminInfoText'} />
							</Inline>
							<Text fontSize="small" color="neutral.300">
								{t('Barnahuses.assignedMasterAdminPlaceholder')}
							</Text>
						</Stack>
					</FormItems>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AddBarnahusPage
