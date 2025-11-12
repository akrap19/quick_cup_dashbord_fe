import { getEvent } from 'api/services/events'

import { EventDetails } from './EventDetails'

interface Props {
	params: {
		id: string
	}
}

const EventDetailsPage = async ({ params }: Props) => {
	const { data: eventData } = await getEvent(params.id)

	return <EventDetails event={eventData} />
}

export default EventDetailsPage
