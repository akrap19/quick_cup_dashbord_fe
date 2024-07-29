import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	languageId?: string
	page?: number
	limit?: number
}

export const getStaffs = (query: Query) => {
	const queryParams = {
		languageId: query.languageId,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`staff/translation`, queryParams)
}

export const createStaff = async (staff: ContentPayload) => {
	const response = await axiosInstanceWithToken.post(`/staff/translation`, staff)

	return response?.data
}

export const createStaffBulk = async (staff: ContentPayload[]) => {
	const response = await axiosInstanceWithToken.post(`/staff/translation/bulk`, {
		translations: staff
	})

	return response?.data
}

export const updateStaff = async (staff: ContentPayload) => {
	const response = await axiosInstanceWithToken.put(`/staff/translation`, staff)

	return response?.data
}

export const getStaff = (id: string) => {
	return fetchWithToken(`staff/translation/${id}`)
}

export const deleteStaff = async (staffId: string) => {
	const response = await axiosInstanceWithToken.delete(`/staff`, { data: { staffId } })

	return response?.data
}

export const deleteStaffs = async (staffIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/staff/bulk`, { data: { staffIds } })

	return response?.data
}
