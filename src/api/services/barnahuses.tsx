import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { BarnahusPayload } from 'api/models/barnahuses/barnahusesPayload'

interface Query {
	search?: string
	location?: string
	page?: number
	limit?: number
}

export const getBarnahuses = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`barnahus`, queryParams)
}

export const createBarnahus = async (barnahus: BarnahusPayload) => {
	const response = await axiosInstanceWithToken.post(`/barnahus`, barnahus)

	return response?.data
}

export const updateBarnahus = async (barnahus: BarnahusPayload) => {
	const response = await axiosInstanceWithToken.put(`/barnahus`, barnahus)

	return response?.data
}

export const getBarnahus = (id: string) => {
	return fetchWithToken(`barnahus/${id}`)
}

export const deleteBarnahus = async (barnahusId: string) => {
	const response = await axiosInstanceWithToken.delete(`/barnahus`, { data: { barnahusId } })

	return response?.data
}

export const deleteBarnahuses = async (barnahusIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/barnahus/bulk`, { data: { barnahusIds } })

	return response?.data
}

export const getBarnahuseLocations = (query: Query) => {
	const queryParams = {
		search: query.location
	}

	return fetchWithToken(`barnahus/locations/search`, queryParams)
}

export const getBarnahuseMasterAdminLocations = async () => {
	return fetchWithToken(`barnahus/locations`)
}

export const getAssignableBarnahus = () => {
	const queryParams = {
		page: 1,
		limit: 200
	}

	return fetchWithToken(`barnahus/assignable`, queryParams)
}
