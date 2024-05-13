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

	const data = fetchWithToken(`barnahus`, queryParams)

	return data
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
	const data = fetchWithToken(`barnahus/${id}`)

	return data
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

	const data = fetchWithToken(`barnahus/locations/search`, queryParams)

	return data
}

export const getBarnahuseMasterAdminLocations = async () => {
	const data = fetchWithToken(`barnahus/locations`)

	return data
}

export const getAssignableBarnahus = () => {
	const queryParams = {
		page: 1,
		limit: 200
	}

	const data = fetchWithToken(`barnahus/assignable`, queryParams)

	return data
}
