import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'
import { ContentPayload } from 'api/models/content/contentPayload'

interface Query {
	language: string
	page: number
	limit: number
}

export const getAbouts = async (query: Query) => {
	const queryParams = {
		languageId: query.language,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}
	const response = await fetchWithToken(`about/translation`, queryParams)

	return response.json()
}

export const createAbout = async (about: ContentPayload) => {
	const response = await axiosInstanceWithToken.post(`/about/translation`, about)

	return response?.data
}

export const updateAbout = async (about: ContentPayload) => {
	const response = await axiosInstanceWithToken.put(`/about/translation`, about)

	return response?.data
}

export const getAbout = async (id: string) => {
	const response = await fetchWithToken(`about/translation/${id}`)

	return response.json()
}

export const deleteAbout = async (id: string) => {
	const response = await axiosInstanceWithToken.delete(`/about`, { data: { id } })

	return response?.data
}

export const deleteAbouts = async (ids: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/about/bulk`, { data: { ids } })

	return response?.data
}
