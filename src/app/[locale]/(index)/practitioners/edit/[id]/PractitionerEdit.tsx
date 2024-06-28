'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Practitioner } from 'api/models/practitioners/practitioner'
import { updatePractitioner } from 'api/services/practitioners'
import { optionalPhoneNumberScheme, requiredString } from 'schemas'

import PractitionerForm from '../../form'

const formSchema = z.object({
	email: z.string().optional(),
	barnahus: z.string().optional(),
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: optionalPhoneNumberScheme.shape.phone,
	userProfession: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	practitioner: Practitioner
}

const PractitionerEdit = ({ practitioner }: Props) => {
	const { back } = useRouter()
	useNavbarItems({ title: 'Practitioners.edit', backLabel: 'Practitioners.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: practitioner.firstName,
			lastName: practitioner.lastName,
			phoneNumber: practitioner.phoneNumber ?? '',
			email: practitioner.email,
			userProfession: practitioner.userProfession,
			barnahus: ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringWithNull(data)
		const result = await updatePractitioner({ ...dataWIhoutEmptyString, userId: practitioner.userId })
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Practitioners.successfullyEdited')
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<PractitionerForm isEdit />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default PractitionerEdit
