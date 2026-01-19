'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'

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

const createFormSchema = (isClient: boolean) =>
	z.object({
		title: requiredString.shape.scheme,
		description: z.string().optional(),
		startDate: requiredString.shape.scheme,
		endDate: requiredString.shape.scheme,
		location: z.string().optional(),
		place: requiredString.shape.scheme,
		street: requiredString.shape.scheme,
		userId: isClient ? z.string().optional() : requiredString.shape.scheme
	})

type Schema = z.infer<ReturnType<typeof createFormSchema>>

const EventAdd = ({ clients, isClient }: EventAddProps) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	useNavbarItems({ title: 'Events.add', backLabel: 'Events.back' })
	const cancelDialog = useOpened()
	const session = useSession()

	const formSchema = createFormSchema(isClient)

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
			userId: isClient ? session.data?.user?.userId || '' : ''
		}
	})

	// Set userId for clients when session loads
	useEffect(() => {
		if (isClient && session.data?.user?.userId) {
			form.setValue('userId', session.data.user.userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isClient, session.data?.user?.userId])

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)

		// Ensure userId is set for clients
		const userId = isClient && session.data?.user?.userId ? session.data.user.userId : dataWIhoutEmptyString.userId

		const payload = {
			...dataWIhoutEmptyString,
			userId: userId || '',
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
