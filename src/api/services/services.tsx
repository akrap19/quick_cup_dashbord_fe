import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ServicePayload } from 'api/models/services/ServicePayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getServices = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`services`, queryParams)
}

export const createService = async (service: ServicePayload) => {
	const response = await axiosInstanceWithToken.post(`/services`, service)

	return response?.data
}

export const updateService = async (service: ServicePayload) => {
	const response = await axiosInstanceWithToken.put(`/services/${service.id}`, service)

	return response?.data
}

export const getService = (serviceId: string) => {
	return fetchWithToken(`services/${serviceId}`)
}

export const deleteService = async (serviceId: string) => {
	const response = await axiosInstanceWithToken.delete(`/services/${serviceId}`)

	return response?.data
}

export const deleteServices = async (serviceIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/services/bulk`, { data: { serviceIds } })

	return response?.data
}
