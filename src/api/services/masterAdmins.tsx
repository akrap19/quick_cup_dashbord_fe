import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { MasterAdmin } from 'api/models/master-admin/masterAdmin'

interface Query {
	search: string
	location: string
	page: number
	limit: number
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

export const createMasterAdmin = async (masterAdmin: MasterAdmin) => {
	const { data } = await axiosInstanceWithToken.post(`/master-admin`, masterAdmin)

	return data
}

export const updateMasterAdmin = async (masterAdmin: MasterAdmin) => {
	const { data } = await axiosInstanceWithToken.patch(`/master-admin`, masterAdmin)

	return data
}

export const deleteMasterAdmin = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/master-admin`, { data: { id } })

	return data
}

export const deleteMasterAdmins = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/master-admin/bulk`, { data: { ids } })

	return data
}
