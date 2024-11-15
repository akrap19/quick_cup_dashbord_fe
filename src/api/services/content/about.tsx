import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ContentFullPayload } from 'api/models/content/contentFullPayload'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	languageId?: string
	page?: number
	limit?: number
}

export const getAbouts = (query: Query) => {
	const queryParams = {
		languageId: query.languageId,
		page: query.page ?? 1,
		limit: query.limit ?? 100
	}

	return fetchWithToken(`about/translation`, queryParams)
}

export const createAbout = async (about: ContentPayload) => {
	const response = await axiosInstanceWithToken.post(`/about/translation`, about)

	return response?.data
}

export const createAboutBulk = async (about: ContentPayload[]) => {
	const response = await axiosInstanceWithToken.post(`/about/translation/bulk`, { translations: about })

	return response?.data
}

export const createAboutFull = async (about: ContentFullPayload) => {
	const response = await axiosInstanceWithToken.post(`/about/translation/full`, about)

	return response?.data
}

export const updateAbout = async (about: ContentPayload) => {
	const response = await axiosInstanceWithToken.put(`/about/translation`, about)

	return response?.data
}

export const getAbout = (id: string) => {
	return fetchWithToken(`about/translation/${id}`)
}

export const deleteAbout = async (aboutId: string) => {
	const response = await axiosInstanceWithToken.delete(`/about`, { data: { aboutId } })

	return response?.data
}

export const deleteAbouts = async (aboutIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/about/bulk`, { data: { aboutIds } })

	return response?.data
}
