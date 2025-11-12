import { Event } from 'api/models/event/event'
import { getEvent } from 'api/services/events'

import EventEdit from './EventEdit'
import { getClients } from 'api/services/clients'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'

interface Props {
	params: {
		userId: string
		id: string
	}
}

const EventEditPage = async ({ params }: Props) => {
	const { data: eventData } = await getEvent(params.id)
	const event = (eventData?.event ?? eventData) as Event
	const { data: clientsData } = await getClients({ search: event.userId, page: 1, limit: 100 })
	const session = await getServerSession(authOptions)
	const isClient = session?.user?.roles[0]?.name.toLowerCase() === UserRoleEnum.CLIENT

	return <EventEdit event={event} isClient={isClient} clients={clientsData?.users} />
}

export default EventEditPage
