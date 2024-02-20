'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Practitioner } from 'api/models/practitioners/practitioner'
import { updatePractitioner } from 'api/services/practitioners'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import PractitionerForm from '../../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	barnahus: requiredString.shape.scheme,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	role: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	practitioner: Practitioner
}

const PractitionerEdit = ({ practitioner }: Props) => {
	const t = useTranslations()
	const { back } = useRouter()
	useNavbarItems({ title: 'Practitioners.edit', backLabel: 'Practitioners.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: practitioner.firstName,
			lastName: practitioner.lastName,
			phoneNumber: practitioner.phoneNumber,
			email: practitioner.firstName,
			role: practitioner.lastName,
			barnahus: practitioner.phoneNumber
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await updatePractitioner({ ...data, id: practitioner.id })
		if (result?.message === 'OK') {
			SuccessToast(t('Practitioners.successfullyEdited'))
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<PractitionerForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default PractitionerEdit
