'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { createBarnahus } from 'api/services/barnahuses'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import { ConfirmAddDialog } from '../../../../../components/overlay/confirm-add-dialog/ConfirmAddDialog'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	location: requiredString.shape.scheme,
	id: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const { push } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Barnahuses.add', backLabel: 'Barnahuses.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', location: '', id: '' }
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await createBarnahus(data)
		if (result?.message === 'OK') {
			SuccessToast(t('MasterAdmins.successfullyCreated'))
			push(ROUTES.MASTER_ADMINS)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<FormItems openCancelDialog={cancelDialog.toggleOpened}>
							<FormControl name="name">
								<FormControl.Label>
									<RequiredLabel>{t('Barnahuses.barnahusName')}</RequiredLabel>
								</FormControl.Label>
								<TextInput placeholder={t('Barnahuses.barnahusNamePlaceholder')} />
								<FormControl.Message />
							</FormControl>
							<FormControl name="location">
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
							<FormControl name="id">
								<FormControl.Label>
									<RequiredLabel>{t('General.masterAdmin')}</RequiredLabel>
								</FormControl.Label>
								<SearchDropdown
									dropdownPlaceholder="General.masterAdmin"
									searchPlaceholder="General.masterAdminPlaceholder"
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
						</FormItems>
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmAddDialog
				title="Barnahuses.add"
				description="Barnahuses.addBarnahusDescription"
				buttonLabel="Barnahuses.save&Add"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Barnahuses.cancelAdd" />
		</>
	)
}

export default AddBarnahusPage
