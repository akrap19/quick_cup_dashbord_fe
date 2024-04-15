'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Admin } from 'api/models/admin/admin'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { updateMasterAdmin } from 'api/services/masterAdmins'
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
	const t = useTranslations()
	const { back } = useRouter()
	useNavbarItems({ title: 'Admins.edit', backLabel: 'Admins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: admin.email,
			barnahus: barnahus?.location,
			firstName: admin.firstName,
			lastName: admin.lastName,
			phoneNumber: admin.phoneNumber
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await updateMasterAdmin({ ...data, userId: admin.userId })
		if (result?.message === 'OK') {
			SuccessToast(t('Admins.successfullyEdited'))
			back()
		}
	}

	console.log('formmm', form.getValues())
	console.log('formmm', barnahus?.location)
	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<AdminForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AdminEdit
