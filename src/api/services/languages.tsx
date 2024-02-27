import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { Language } from 'api/models/language/language'

interface Query {
	status?: string
	page?: number
	limit?: number
	language?: string
}

export const getLanguages = async (query: Query) => {
	const queryParams = {
		search: query.status,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`language`, queryParams)

	return response.json()
}

export const createLanguage = async (language: Language) => {
	const { data } = await axiosInstanceWithToken.post(`/language`, language)

	return data
}

export const updateLanguage = async (language: Language) => {
	const { data } = await axiosInstanceWithToken.patch(`/language`, language)

	return data
}

export const getLanguage = async (id: string) => {
	const response = await fetchWithToken(`language/${id}`)

	return response.json()
}

export const deleteLanguage = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/language`, { data: { id } })

	return data
}

export const deleteLanguages = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/language/bulk`, { data: { ids } })

	return data
}

export const getLanguageSupported = async (query: Query) => {
	const queryParams = {
		search: query.language
	}

	const response = await fetchWithToken(`language/supported`, queryParams)

	return response.json()
}
