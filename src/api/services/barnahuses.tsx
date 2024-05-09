import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'
import { BarnahusPayload } from 'api/models/barnahuses/barnahusesPayload'

interface Query {
	search?: string
	location?: string
	page?: number
	limit?: number
}

export const getBarnahuses = async (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`barnahus`, queryParams)

	return response.json()
}

export const createBarnahus = async (barnahus: BarnahusPayload) => {
	const response = await axiosInstanceWithToken.post(`/barnahus`, barnahus)

	return response?.data
}

export const updateBarnahus = async (barnahus: BarnahusPayload) => {
	const response = await axiosInstanceWithToken.put(`/barnahus`, barnahus)

	return response?.data
}

export const getBarnahus = async (id: string) => {
	const response = await fetchWithToken(`barnahus/${id}`)

	return response.json()
}

export const deleteBarnahus = async (barnahusId: string) => {
	const response = await axiosInstanceWithToken.delete(`/barnahus`, { data: { barnahusId } })

	return response?.data
}

export const deleteBarnahuses = async (barnahusIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/barnahus/bulk`, { data: { barnahusIds } })

	return response?.data
}

export const getBarnahuseLocations = async (query: Query) => {
	const queryParams = {
		search: query.location
	}

	const response = await fetchWithToken(`barnahus/locations/search`, queryParams)

	return response.json()
}

export const getBarnahuseMasterAdminLocations = async () => {
	const response = await fetchWithToken(`barnahus/locations`)

	return response.json()
}

export const getAssignableBarnahus = async () => {
	const queryParams = {
		page: 1,
		limit: 200
	}

	const response = await fetchWithToken(`barnahus/assignable`, queryParams)

	return response.json()
}
