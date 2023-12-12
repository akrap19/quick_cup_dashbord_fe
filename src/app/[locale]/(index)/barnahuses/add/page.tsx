'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { TextInput } from '@/components/inputs/text-input'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'

const formSchema = z.object({
	barnahusName: z.string().min(1, { message: 'ValidationMeseges.required' }),
	barnahusLocation: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	useNavbarItems({ title: 'Barnahuses.add', backLabel: 'barnahuses' })

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { barnahusName: '', barnahusLocation: '' }
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
								<InputInfo infoText="Barnahuses.assignedMasterAdminInfoText" />
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
