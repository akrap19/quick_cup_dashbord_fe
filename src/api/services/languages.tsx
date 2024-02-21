import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { Language } from 'api/models/language/language'

interface Query {
	status: string
	page: number
	limit: number
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

export const createLanguage = async (admin: Language) => {
	const { data } = await axiosInstanceWithToken.post(`/language`, admin)

	return data
}

export const updateLanguage = async (admin: Language) => {
	const { data } = await axiosInstanceWithToken.patch(`/language`, admin)

	return data
}

export const deleteLanguage = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/language`, { data: { id } })

	return data
}

export const deleteLanguages = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/language/bulk`, { data: { ids } })

	return data
}
