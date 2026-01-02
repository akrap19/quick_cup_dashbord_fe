'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'
import { updateServiceLocation } from 'api/services/serviceLocations'
import { emailSchema, phoneNumberScheme, requiredString } from 'schemas'

import ServiceLocationForm from '../../form'

const formSchema = z.object({
	city: requiredString.shape.scheme,
	address: requiredString.shape.scheme,
	phone: phoneNumberScheme.shape.phone,
	email: emailSchema.shape.email
})

type Schema = z.infer<typeof formSchema>

interface Props {
	serviceLocation: ServiceLocation
	serviceId: string
}

const ServiceLocationEdit = ({ serviceLocation, serviceId }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'ServiceLocations.edit', backLabel: 'ServiceLocations.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			city: serviceLocation?.city ?? '',
			address: serviceLocation?.address ?? '',
			phone: serviceLocation?.phone ?? '',
			email: serviceLocation?.email ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateServiceLocation(serviceLocation?.id ?? '', { ...dataWIhoutEmptyString, serviceId })

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'ServiceLocations.successfullyEdited')
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
					<ServiceLocationForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default ServiceLocationEdit
