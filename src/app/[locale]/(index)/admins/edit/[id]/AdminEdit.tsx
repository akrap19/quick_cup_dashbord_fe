'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Admin } from 'api/models/admin/admin'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { updateAdmin } from 'api/services/admins'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import AdminForm from '../../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	barnahus: z.string().optional(),
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone
})

type Schema = z.infer<typeof formSchema>

interface Props {
	admin: Admin
	barnahus?: Barnahus
}

const AdminEdit = ({ admin, barnahus }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Admins.edit', backLabel: 'Admins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: admin.email,
			barnahus: barnahus?.location,
			firstName: admin.firstName,
			lastName: admin.lastName,
			phoneNumber: admin.phoneNumber ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringWithNull(data)
		const result = await updateAdmin({ ...dataWIhoutEmptyString, userId: admin.userId })
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Admins.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<AdminForm isEdit />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AdminEdit
