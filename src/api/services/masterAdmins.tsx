import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
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

	const data = fetchWithToken(`master-admin`, queryParams)

	return data
}

export const createMasterAdmin = async (masterAdmin: AdminPayload) => {
	const response = await axiosInstanceWithToken.post(`/master-admin`, masterAdmin)

	return response?.data
}

export const updateMasterAdmin = async (masterAdmin: AdminPayload) => {
	const response = await axiosInstanceWithToken.put(`/master-admin`, masterAdmin)

	return response?.data
}

export const getMasterAdmin = (id: string) => {
	const data = fetchWithToken(`master-admin/${id}`)

	return data
}

export const deleteMasterAdmin = async (userId: string) => {
	const response = await axiosInstanceWithToken.delete(`/master-admin`, { data: { userId } })

	return response?.data
}

export const deleteMasterAdmins = async (userIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/master-admin/bulk`, { data: { userIds } })

	return response?.data
}

export const getAssignableMasterAdmin = (query: Query) => {
	const queryParams = {
		search: query.masterAdmin,
		page: query.page ?? 1,
		limit: query.limit ?? 100
	}

	const data = fetchWithToken(`master-admin/assignable`, queryParams)

	return data
}
