import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ClientPayload } from 'api/models/clients/clientPayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getClients = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`client`, queryParams)
}

export const createClient = async (client: ClientPayload) => {
	const response = await axiosInstanceWithToken.post(`/client`, client)

	return response?.data
}

export const updateClient = async (client: ClientPayload) => {
	const response = await axiosInstanceWithToken.put(`/client`, client)

	return response?.data
}

export const getClient = (userId: string) => {
	return fetchWithToken(`client/${userId}`)
}

export const deleteClient = async (userId: string) => {
	const response = await axiosInstanceWithToken.delete(`/client`, { data: { userId } })

	return response?.data
}

export const deleteClients = async (userIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/client/bulk`, { data: { userIds } })

	return response?.data
}
