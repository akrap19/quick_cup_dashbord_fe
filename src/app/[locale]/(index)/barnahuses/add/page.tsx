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
import { requiredString } from 'schemas'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'

const options = [
	{ value: '', label: 'Select an option' },
	{ value: 'A', label: 'A', disabled: false },
	{ value: 'B', label: 'B', disabled: false },
	{ value: 'C', label: 'C', disabled: false }
]

const formSchema = z.object({
	barnahusName: requiredString.shape.scheme,
	barnahusLocation: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	useNavbarItems({ title: 'Barnahuses.add', backLabel: 'Barnahuses.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
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
							<SearchDropdown />
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
