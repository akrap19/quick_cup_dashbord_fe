import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
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
	const { data } = await axiosInstanceWithToken.post(`/barnahus`, barnahus)

	return data
}

export const updateBarnahus = async (barnahus: BarnahusPayload) => {
	const { data } = await axiosInstanceWithToken.patch(`/barnahus`, barnahus)

	return data
}

export const getBarnahus = async (id: string) => {
	const response = await fetchWithToken(`barnahus/${id}`)

	return response.json()
}

export const deleteBarnahus = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/barnahus`, { data: { id } })

	return data
}

export const deleteBarnahuses = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/barnahus/bulk`, { data: { ids } })

	return data
}

export const getBarnahuseLocations = async (query: Query) => {
	const queryParams = {
		search: query.location
	}

	const response = await fetchWithToken(`barnahus/locations`, queryParams)

	return response.json()
}
