import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { CaseFilePayload } from 'api/models/caseFiles/caseFilePayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getCaseFiles = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`case-file`, queryParams)
}

export const createCaseFile = async (caseFile: CaseFilePayload) => {
	const response = await axiosInstanceWithToken.post(`/case-file`, caseFile)

	return response?.data
}

export const updateCaseFile = async (caseFile: CaseFilePayload) => {
	const response = await axiosInstanceWithToken.put(`/case-file`, caseFile)

	return response?.data
}

export const getCaseFile = (id: string) => {
	return fetchWithToken(`case-file/${id}`)
}

export const deleteCaseFile = async (id: string) => {
	const response = await axiosInstanceWithToken.delete(`/case-file`, { data: { id } })

	return response?.data
}

export const deleteCaseFiles = async (ids: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/case-file/bulk`, { data: { ids } })

	return response?.data
}
