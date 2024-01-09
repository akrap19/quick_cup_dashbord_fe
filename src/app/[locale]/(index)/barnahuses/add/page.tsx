'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { FormControl } from '@/components/inputs/form-control'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { requiredString } from 'schemas'

import { CancelAddDialog } from './CancelAddDialog'
import { ConfirmAddDialog } from './ConfirmAddDialog'

const formSchema = z.object({
	barnahusName: requiredString.shape.scheme,
	barnahusLocation: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Barnahuses.add', backLabel: 'Barnahuses.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { barnahusName: '', barnahusLocation: '' }
	})

	const onSubmit = async (data: Schema) => {
		confirmDialog.toggleOpened()
		console.log(data)
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormItems openCancelDialog={cancelDialog.toggleOpened}>
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
								<SearchDropdown
									dropdownPlaceholder="General.location"
									searchPlaceholder="Barnahuses.barnahusLocation"
									options={[
										{ value: 'osl', label: 'Oslo, Norway' },
										{ value: 'stck', label: 'Stockholm, Sweden' },
										{ value: 'brl', label: 'Berlin, Germany' },
										{ value: 'lnd', label: 'London, England' },
										{ value: 'zg', label: 'Zagreb, Croatia' }
									]}
								/>
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
			<ConfirmAddDialog confirmDialog={confirmDialog} />
			<CancelAddDialog cancelDialog={cancelDialog} />
		</>
	)
}

export default AddBarnahusPage
