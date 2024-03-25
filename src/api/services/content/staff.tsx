import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	languageId: string
	xBarnahusId: string
	page: number
	limit: number
}

export const getStaffs = async (query: Query) => {
	const queryParams = {
		languageId: query.languageId,
		xBarnahusId: query.xBarnahusId,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}
	const response = await fetchWithToken(`staff/translation`, queryParams)

	return response.json()
}

export const createStaff = async (staff: ContentPayload) => {
	const { data } = await axiosInstanceWithToken.post(`/staff/translation`, staff)

	return data
}

export const updateStaff = async (staff: ContentPayload) => {
	const { data } = await axiosInstanceWithToken.put(`/staff/translation`, staff)

	return data
}

export const getStaff = async (id: string) => {
	const response = await fetchWithToken(`staff/translation/${id}`)

	return response.json()
}

export const deleteStaff = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/staff`, { data: { id } })

	return data
}

export const deleteStaffs = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/staff/bulk`, { data: { ids } })

	return data
}
