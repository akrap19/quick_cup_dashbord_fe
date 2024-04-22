import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	language: string
	page: number
	limit: number
}

export const getRooms = async (query: Query) => {
	const queryParams = {
		languageId: query.language,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}
	const response = await fetchWithToken(`room/translation`, queryParams)

	return response.json()
}

export const createRoom = async (room: ContentPayload) => {
	const { data } = await axiosInstanceWithToken.post(`/room/translation`, room)

	return data
}

export const updateRoom = async (room: ContentPayload) => {
	const { data } = await axiosInstanceWithToken.put(`/room/translation`, room)

	return data
}

export const getRoom = async (id: string) => {
	const response = await fetchWithToken(`room/translation/${id}`)

	return response.json()
}

export const deleteRoom = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/room`, { data: { id } })

	return data
}

export const deleteRooms = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/room/bulk`, { data: { ids } })

	return data
}
