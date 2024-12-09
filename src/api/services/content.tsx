import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { CasePayload } from 'api/models/content/casePayload'
import { CustomCase } from 'api/models/content/customCase'

interface Query {
	languageId?: string
	page?: number
	limit?: number
	search?: string
}

export const getContent = (query: Query) => {
	const queryParams = {
		languageId: query.languageId
	}

	return fetchWithToken(`content?languageId=${queryParams?.languageId}`)
}

export const getTemplate = () => {
	return fetchWithToken(`/content/template`)
}

export const createCase = async (data: CasePayload) => {
	const response = await axiosInstanceWithToken.post(`/content/case`, data)

	return response?.data
}

export const createCustomCase = async (customCase: CustomCase) => {
	const response = await axiosInstanceWithToken.post(`/content/case/custom`, customCase)

	return response?.data
}

export const getCases = (query: Query) => {
	const queryParams = {
		page: query.page ?? 1,
		limit: query.limit ?? 10,
		search: query.search
	}

	return fetchWithToken(`/content/case`, queryParams)
}

export const getCase = (id: string) => {
	return fetchWithToken(`/content/case/${id}`)
}
