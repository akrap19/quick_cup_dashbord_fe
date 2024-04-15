import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { AdminPayload } from 'api/models/admin/AdminPayload'

interface Query {
	search?: string
	location?: string
	masterAdmin?: string
	page?: number
	limit?: number
}

export const getMasterAdmins = async (query: Query) => {
	const queryParams = {
		search: query.search,
		location: query.location,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`master-admin`, queryParams)

	return response.json()
}

export const createMasterAdmin = async (masterAdmin: AdminPayload) => {
	const { data } = await axiosInstanceWithToken.post(`/master-admin`, masterAdmin)

	return data
}

export const updateMasterAdmin = async (masterAdmin: AdminPayload) => {
	const { data } = await axiosInstanceWithToken.put(`/master-admin`, masterAdmin)

	return data
}

export const getMasterAdmin = async (id: string) => {
	const response = await fetchWithToken(`master-admin/${id}`)

	return response.json()
}

export const deleteMasterAdmin = async (userId: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/master-admin`, { data: { userId } })

	return data
}

export const deleteMasterAdmins = async (userIds: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/master-admin/bulk`, { data: { userIds } })

	return data
}

export const getAssignableMasterAdmin = async (query: Query) => {
	const queryParams = {
		search: query.masterAdmin,
		page: query.page ?? 1,
		limit: query.limit ?? 100
	}
	console.log('query', queryParams)
	const response = await fetchWithToken(`master-admin/assignable`, queryParams)

	return response.json()
}
