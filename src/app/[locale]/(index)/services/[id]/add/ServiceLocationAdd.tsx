'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createServiceLocation } from 'api/services/serviceLocations'
import { requiredString } from 'schemas'

import ServiceLocationForm from '../form'

const formSchema = z.object({
	city: requiredString.shape.scheme,
	address: requiredString.shape.scheme,
	phone: requiredString.shape.scheme,
	email: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	serviceId: string
}

const ServiceLocationAdd = ({ serviceId }: Props) => {
	const t = useTranslations()
	const { refresh, back } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'ServiceLocations.add', backLabel: 'ServiceLocations.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			city: '',
			address: '',
			phone: '',
			email: ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await createServiceLocation({ ...dataWIhoutEmptyString, serviceId })

		if (result?.message === 'OK') {
			SuccessToast(t('ServiceLocations.successfullyCreated'))
			refresh()
			back()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<ServiceLocationForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="ServiceLocations.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default ServiceLocationAdd
