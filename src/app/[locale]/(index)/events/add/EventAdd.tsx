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
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createEvent } from 'api/services/events'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import EventForm from '../form'
import { useOpened } from '@/hooks/use-toggle'
import { Clients } from 'api/models/clients/clients'
import { useSession } from 'next-auth/react'

type EventAddProps = {
	isClient: boolean
	clients: Clients[]
}

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

const EventAdd = ({ clients, isClient }: EventAddProps) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	useNavbarItems({ title: 'Events.add', backLabel: 'Events.back' })
	const cancelDialog = useOpened()
	const session = useSession()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			startDate: '',
			endDate: '',
			location: '',
			place: '',
			street: '',
			userId: isClient ? session.data?.user?.userId : ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const payload = {
			...dataWIhoutEmptyString,
			place: dataWIhoutEmptyString.place?.trim() || '',
			street: dataWIhoutEmptyString.street?.trim() || ''
		}
		const result = await createEvent(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('Events.successfullyCreated'))
			push(ROUTES.EVENTS)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<EventForm cancelDialog={cancelDialog} isClient={isClient} clients={clients} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Events.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default EventAdd
