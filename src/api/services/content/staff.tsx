import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	language: string
	page: number
	limit: number
}

export const getStaffs = (query: Query) => {
	const queryParams = {
		languageId: query.language,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const data = fetchWithToken(`staff/translation`, queryParams)

	return data
}

export const createStaff = async (staff: ContentPayload) => {
	const response = await axiosInstanceWithToken.post(`/staff/translation`, staff)

	return response?.data
}

export const updateStaff = async (staff: ContentPayload) => {
	const response = await axiosInstanceWithToken.put(`/staff/translation`, staff)

	return response?.data
}

export const getStaff = (id: string) => {
	const data = fetchWithToken(`staff/translation/${id}`)

	return data
}

export const deleteStaff = async (id: string) => {
	const response = await axiosInstanceWithToken.delete(`/staff`, { data: { id } })

	return response?.data
}

export const deleteStaffs = async (ids: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/staff/bulk`, { data: { ids } })

	return response?.data
}
