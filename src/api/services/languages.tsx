import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { LanguagePayload } from 'api/models/language/languagePayload'

interface Query {
	search?: string
	status?: string
	page?: number
	limit?: number
	language?: string
}

export const getLanguages = (query: Query) => {
	const queryParams = {
		status: query.status,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`language`, queryParams)
}

export const createLanguage = async (language: LanguagePayload) => {
	const response = await axiosInstanceWithToken.post(`/language`, language)

	return response?.data
}

export const updateLanguage = async (language: LanguagePayload) => {
	const response = await axiosInstanceWithToken.put(`/language`, language)

	return response?.data
}

export const getLanguage = (id: string) => {
	return fetchWithToken(`language/${id}`)
}

export const getLanguageSearch = (query: Query, status?: string) => {
	const queryParams = {
		search: query.language,
		status
	}

	return fetchWithToken(`/language/search`, queryParams)
}

export const deleteLanguage = async (languageId: string) => {
	const response = await axiosInstanceWithToken.delete(`/language`, { data: { languageId } })

	return response?.data
}

export const deleteLanguages = async (languageIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/language/bulk`, { data: { languageIds } })

	return response?.data
}

export const getLanguageSupported = (query: Query) => {
	const queryParams = {
		search: query.language
	}

	return fetchWithToken(`language/supported`, queryParams)
}

export const publishLanguage = async (languageId: string) => {
	const response = await axiosInstanceWithToken.post(`/language/publish`, { languageId })

	return response?.data
}

export const translateLanguage = async (languageId: string) => {
	const response = await axiosInstanceWithToken.post(`/language/translate`, { languageId })

	return response?.data
}
