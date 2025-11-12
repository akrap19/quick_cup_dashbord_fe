import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { EventPayload } from 'api/models/event/eventPayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getEvents = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`events`, queryParams)
}

export const createEvent = async (event: EventPayload) => {
	const response = await axiosInstanceWithToken.post(`/events`, event)

	return response?.data
}

export const updateEvent = async (event: EventPayload) => {
	const response = await axiosInstanceWithToken.put(`/events/${event.id}`, event)

	return response?.data
}

export const getEvent = (eventId: string) => {
	return fetchWithToken(`events/${eventId}`)
}

export const deleteEvent = async (eventId: string) => {
	const response = await axiosInstanceWithToken.delete(`/events/${eventId}`)

	return response?.data
}

export const deleteEvents = async (eventIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/events/bulk`, { data: { eventIds } })

	return response?.data
}
