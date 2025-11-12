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
import { requiredString } from 'schemas'

import ServiceForm from '../../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	description: requiredString.shape.scheme
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
			name: service?.name,
			description: service?.description ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateService({ ...dataWIhoutEmptyString, id: service?.id })

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Services.successfullyEdited')
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
					<ServiceForm isEdit />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default ServiceEdit
