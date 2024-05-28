import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
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

	return fetchWithToken(`admin`, queryParams)
}

export const createAdmin = async (admin: AdminPayload) => {
	const response = await axiosInstanceWithToken.post(`/admin`, admin)

	return response?.data
}

export const updateAdmin = async (admin: AdminPayload) => {
	const response = await axiosInstanceWithToken.put(`/admin`, admin)

	return response?.data
}

export const getAdmin = (userId: string) => {
	return fetchWithToken(`admin/${userId}`)
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
