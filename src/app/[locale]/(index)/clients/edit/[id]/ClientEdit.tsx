'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { string, z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Client } from 'api/models/clients/client'
import { updateClient } from 'api/services/clients'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import ClientForm from '../../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	location: string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	client: Client
}

const ClientEdit = ({ client }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Clients.edit', backLabel: 'Clients.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: client.email,
			firstName: client.firstName,
			lastName: client.lastName,
			phoneNumber: client.phoneNumber ?? '',
			location: client.location ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateClient({ ...dataWIhoutEmptyString, userId: client.userId })
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Clients.successfullyEdited')
			refresh()

			setTimeout(() => {
				back()
			}, 500)
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ClientForm isEdit />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default ClientEdit
