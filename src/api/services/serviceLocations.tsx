import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ServiceLocationPayload } from 'api/models/service-locations/serviceLocationPayload'

interface Query {
	search: string
	serviceId: string
	page: number
	limit: number
}

export const getServiceLocations = (query: Query) => {
	const queryParams = {
		search: query.search,
		serviceId: query.serviceId,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`service-locations`, queryParams)
}

export const createServiceLocation = async (serviceLocation: ServiceLocationPayload) => {
	const response = await axiosInstanceWithToken.post(`/service-locations`, serviceLocation)

	return response?.data
}

export const updateServiceLocation = async (id: string, serviceLocation: ServiceLocationPayload) => {
	const response = await axiosInstanceWithToken.put(`/service-locations/${id}`, serviceLocation)

	return response?.data
}

export const getServiceLocation = (serviceLocationId: string) => {
	return fetchWithToken(`service-locations/${serviceLocationId}`)
}

export const deleteServiceLocation = async (serviceLocationId: string) => {
	const response = await axiosInstanceWithToken.delete(`/service-locations/${serviceLocationId}`)

	return response?.data
}
