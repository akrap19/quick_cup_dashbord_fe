'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Admin } from 'api/models/admin/admin'
import { updateMasterAdmin } from 'api/services/masterAdmins'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

const formSchema = z.object({
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	...emailSchema.shape
})

type Schema = z.infer<typeof formSchema>

interface Props {
	masterAdmin: Admin
}

const EditMasterAdmin = ({ masterAdmin }: Props) => {
	const t = useTranslations()
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'MasterAdmins.edit', backLabel: 'MasterAdmins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
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
			SuccessToast(t('MasterAdmins.successfullyEdited'))
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>{/* <MasterAdminForm /> */}</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default EditMasterAdmin
