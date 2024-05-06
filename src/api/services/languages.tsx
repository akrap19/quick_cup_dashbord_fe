import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'
import { LanguagePayload } from 'api/models/language/languagePayload'

interface Query {
	search?: string
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
	const response = await axiosInstanceWithToken.post(`/language`, language)

	return response?.data
}

export const updateLanguage = async (language: LanguagePayload) => {
	const response = await axiosInstanceWithToken.put(`/language`, language)

	return response?.data
}

export const getLanguage = async (id: string) => {
	const response = await fetchWithToken(`language/${id}`)

	return response.json()
}

export const getLanguageSearch = async (query: Query, status: string) => {
	const queryParams = {
		search: query.language,
		status
	}

	const response = await fetchWithToken(`/language/search`, queryParams)

	return response.json()
}

export const deleteLanguage = async (languageId: string) => {
	const response = await axiosInstanceWithToken.delete(`/language`, { data: { languageId } })

	return response?.data
}

export const deleteLanguages = async (languageIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/language/bulk`, { data: { languageIds } })

	return response?.data
}

export const getLanguageSupported = async (query: Query) => {
	const queryParams = {
		search: query.language
	}

	const response = await fetchWithToken(`language/supported`, queryParams)

	return response.json()
}
