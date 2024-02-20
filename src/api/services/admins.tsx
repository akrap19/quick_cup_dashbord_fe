import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { AdminPayload } from 'api/models/admin/adminPayload'

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
	const { data } = await axiosInstanceWithToken.patch(`/admin`, admin)

	return data
}

export const getAdmin = async (id: string) => {
	const response = await fetchWithToken(`admin/${id}`)

	return response.json()
}

export const deleteAdmin = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/admin`, { data: { id } })

	return data
}

export const deleteAdmins = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/admin/bulk`, { data: { ids } })

	return data
}
