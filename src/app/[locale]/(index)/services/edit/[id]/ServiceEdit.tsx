'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Service } from 'api/models/services/service'
import { updateService } from 'api/services/services'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import ServiceForm from '../../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone
})

type Schema = z.infer<typeof formSchema>

interface Props {
	service: Service
}

const ServiceEdit = ({ service }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Services.edit', backLabel: 'Services.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: service?.email,
			firstName: service?.firstName,
			lastName: service?.lastName,
			phoneNumber: service?.phoneNumber ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateService({ ...dataWIhoutEmptyString, userId: service?.userId })
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Services.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ServiceForm isEdit />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default ServiceEdit
