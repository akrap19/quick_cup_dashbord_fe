import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	languageId: string
	xBarnahusId: string
	page: number
	limit: number
}

export const getAbouts = async (query: Query) => {
	const queryParams = {
		languageId: query.languageId,
		xBarnahusId: query.xBarnahusId,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}
	const response = await fetchWithToken(`about/translation`, queryParams)

	return response.json()
}

export const createAbout = async (about: ContentPayload) => {
	const { data } = await axiosInstanceWithToken.post(`/about/translation`, about)

	return data
}

export const updateAbout = async (about: ContentPayload) => {
	const { data } = await axiosInstanceWithToken.put(`/about/translation`, about)

	return data
}

export const getAbout = async (id: string) => {
	const response = await fetchWithToken(`about/translation/${id}`)

	return response.json()
}

export const deleteAbout = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/about`, { data: { id } })

	return data
}

export const deleteAbouts = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/about/bulk`, { data: { ids } })

	return data
}
