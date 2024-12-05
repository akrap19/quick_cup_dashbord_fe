import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { Template } from 'api/models/template/template'

interface Query {
	page?: number
	limit?: number
	search?: string
}

export const createTemplate = async (templateData: Template) => {
	const response = await axiosInstanceWithToken.post(`/template`, templateData)

	return response?.data
}

export const getTemplates = (query: Query) => {
	const queryParams = {
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`template`, queryParams)
}

export const getTemplatesSearch = (query: Query) => {
	const queryParams = {
		page: 1,
		limit: 1000,
		search: query.search
	}

	return fetchWithToken(`template`, queryParams)
}

export const getTemplate = (templateId?: string) => {
	return fetchWithToken(`template/${templateId}`)
}

export const deleteTemplate = async (templateId: string) => {
	const response = await axiosInstanceWithToken.delete(`/template`, {
		data: { templateId }
	})

	return response?.data
}

export const deleteTemplates = async (templateIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/template/bulk`, { data: { templateIds } })

	return response?.data
}
