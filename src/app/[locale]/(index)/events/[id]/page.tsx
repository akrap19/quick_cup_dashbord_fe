import { getEvent } from 'api/services/events'

import { EventDetails } from './EventDetails'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'

interface Props {
	params: {
		id: string
	}
}

const EventDetailsPage = async ({ params }: Props) => {
	const { data: eventData } = await getEvent(params.id)
	const session = await getServerSession(authOptions)
	const isClient = session?.user?.roles[0]?.name === UserRoleEnum.CLIENT

	return <EventDetails event={eventData} isClient={isClient} />
}

export default EventDetailsPage
