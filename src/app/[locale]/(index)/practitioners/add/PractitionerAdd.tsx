'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { createPractitioner } from 'api/services/practitioners'
import { ROUTES } from 'parameters'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import PractitionerForm from '../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	barnahus: requiredString.shape.scheme,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	userProfession: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	barnahus?: Barnahus
}

const PractitionerAdd = ({ barnahus }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Practitioners.add', backLabel: 'Practitioners.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			barnahus: barnahus?.location,
			firstName: '',
			lastName: '',
			phoneNumber: '',
			userProfession: ''
		}
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await createPractitioner(dataWIhoutEmptyString)
		if (result?.message === 'OK') {
			SuccessToast(t('Practitioners.successfullyCreated'))
			push(ROUTES.PRACTITIONERS)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<PractitionerForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="Practitioners.addNew"
				description="Practitioners.addPractitionerDescription"
				buttonLabel="General.addAndInvite"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Practitioners.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default PractitionerAdd
