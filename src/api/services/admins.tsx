import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { AdminPayload } from 'api/models/admin/AdminPayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getAdmins = async (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`admin`, queryParams)

	return response.json()
}

export const createAdmin = async (admin: AdminPayload) => {
	const { data } = await axiosInstanceWithToken.post(`/admin`, admin)

	return data
}

export const updateAdmin = async (admin: AdminPayload) => {
	const { data } = await axiosInstanceWithToken.put(`/admin`, admin)

	return data
}

export const getAdmin = async (userId: string) => {
	const response = await fetchWithToken(`admin/${userId}`)

	console.log('response', response)
	return response.json()
}

export const deleteAdmin = async (userId: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/admin`, {
		data: { userId }
	})

	return data
}

export const deleteAdmins = async (userIds: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/admin/bulk`, { data: { userIds } })

	return data
}
