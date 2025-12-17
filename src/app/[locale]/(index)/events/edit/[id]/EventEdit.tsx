'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Event } from 'api/models/event/event'
import { updateEvent } from 'api/services/events'
import { requiredString } from 'schemas'

import EventForm from '../../form'
import { Clients } from 'api/models/clients/clients'

const formSchema = z.object({
	title: requiredString.shape.scheme,
	description: requiredString.shape.scheme,
	startDate: requiredString.shape.scheme,
	endDate: requiredString.shape.scheme,
	location: requiredString.shape.scheme,
	place: requiredString.shape.scheme,
	street: requiredString.shape.scheme,
	userId: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	isClient: boolean
	event: Event
	clients: Clients[]
}

const EventEdit = ({ event, clients, isClient }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Events.edit', backLabel: 'Events.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: event?.title,
			description: event?.description ?? '',
			startDate: event?.startDate ?? '',
			endDate: event?.endDate ?? '',
			location: event?.location ?? '',
			place: event?.place ?? '',
			street: event?.street ?? '',
			userId: event?.userId ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const payload = {
			...dataWIhoutEmptyString,
			title: dataWIhoutEmptyString.title,
			place: dataWIhoutEmptyString.place?.trim() || '',
			street: dataWIhoutEmptyString.street?.trim() || '',
			id: event?.id
		}
		delete payload.title
		const result = await updateEvent(payload)
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Events.successfullyEdited')
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
					<EventForm isClient={isClient} clients={clients} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default EventEdit
