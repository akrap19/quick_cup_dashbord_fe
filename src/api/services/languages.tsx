import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { LanguagePayload } from 'api/models/language/languagePayload'

interface Query {
	status?: string
	page?: number
	limit?: number
	language?: string
}

export const getLanguages = async (query: Query) => {
	const queryParams = {
		status: query.status,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`language`, queryParams)

	return response.json()
}

export const createLanguage = async (language: LanguagePayload) => {
	const { data } = await axiosInstanceWithToken.post(`/language`, language)

	return data
}

export const updateLanguage = async (language: LanguagePayload) => {
	const { data } = await axiosInstanceWithToken.put(`/language`, language)

	return data
}

export const getLanguage = async (id: string) => {
	const response = await fetchWithToken(`language/${id}`)

	return response.json()
}

export const deleteLanguage = async (languageId: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/language`, { data: { languageId } })

	return data
}

export const deleteLanguages = async (languageIds: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/language/bulk`, { data: { languageIds } })

	return data
}

export const getLanguageSupported = async (query: Query) => {
	const queryParams = {
		search: query.language
	}

	const response = await fetchWithToken(`language/supported`, queryParams)

	return response.json()
}
