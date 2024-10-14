import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { Template } from 'api/models/template/template'

interface Query {
	page?: number
	limit?: number
}

export const getTemplates = (query: Query) => {
	const queryParams = {
		page: query.page ?? 1,
		limit: query.limit ?? 100
	}

	return fetchWithToken(`template`, queryParams)
}

export const createTemplate = async (templateData: Template) => {
	const response = await axiosInstanceWithToken.post(`/template`, templateData)

	return response?.data
}
