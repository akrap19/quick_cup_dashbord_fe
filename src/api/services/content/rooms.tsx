import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'
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
	const response = await axiosInstanceWithToken.post(`/room/translation`, room)

	return response?.data
}

export const updateRoom = async (room: ContentPayload) => {
	const response = await axiosInstanceWithToken.put(`/room/translation`, room)

	return response?.data
}

export const getRoom = async (id: string) => {
	const response = await fetchWithToken(`room/translation/${id}`)

	return response.json()
}

export const deleteRoom = async (id: string) => {
	const response = await axiosInstanceWithToken.delete(`/room`, { data: { id } })

	return response?.data
}

export const deleteRooms = async (ids: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/room/bulk`, { data: { ids } })

	return response?.data
}
