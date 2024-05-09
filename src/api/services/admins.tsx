import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { dataFetchWithToken } from 'api/instances/FetchWithToken'
import { fetchWithToken } from 'api/instances/Instance'
import { AdminPayload } from 'api/models/admin/AdminPayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getAdmins = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return dataFetchWithToken(`admin`, queryParams)
}

export const createAdmin = async (admin: AdminPayload) => {
	const response = await axiosInstanceWithToken.post(`/admin`, admin)

	return response?.data
}

export const updateAdmin = async (admin: AdminPayload) => {
	const response = await axiosInstanceWithToken.put(`/admin`, admin)

	return response?.data
}

export const getAdmin = async (userId: string) => {
	const response = await fetchWithToken(`admin/${userId}`)

	console.log('response', response)
	return response.json()
}

export const deleteAdmin = async (userId: string) => {
	const response = await axiosInstanceWithToken.delete(`/admin`, {
		data: { userId }
	})

	return response?.data
}

export const deleteAdmins = async (userIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/admin/bulk`, { data: { userIds } })

	return response?.data
}
