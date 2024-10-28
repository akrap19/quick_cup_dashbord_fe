'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Admin } from 'api/models/admin/admin'
import { Base } from 'api/models/common/base'
import { updateMasterAdmin } from 'api/services/masterAdmins'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import MasterAdminForm from '../../form'

const formSchema = z.object({
	barnahus: requiredString.shape.scheme,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	...emailSchema.shape
})

type Schema = z.infer<typeof formSchema>

interface Props {
	masterAdmin: Admin
	barnahuses: Base[]
}

const EditMasterAdmin = ({ masterAdmin, barnahuses }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'MasterAdmins.edit', backLabel: 'MasterAdmins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			barnahus: masterAdmin.locations[0],
			firstName: masterAdmin.firstName,
			lastName: masterAdmin.lastName,
			phoneNumber: masterAdmin.phoneNumber ?? '',
			email: masterAdmin.email
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringWithNull(data)
		const result = await updateMasterAdmin({ ...dataWIhoutEmptyString, userId: masterAdmin.userId })
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'MasterAdmins.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<MasterAdminForm barnahuses={barnahuses} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default EditMasterAdmin
