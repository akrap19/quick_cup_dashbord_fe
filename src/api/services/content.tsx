import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { CasePayload } from 'api/models/content/casePayload'
import { CustomCase } from 'api/models/content/customCase'

interface Query {
	languageId?: string
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
