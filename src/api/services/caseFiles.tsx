import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { CaseFilePayload } from 'api/models/caseFiles/caseFilePayload'

interface Query {
	search: string
	status?: string
	page?: number
	limit?: number
}

export const getCaseFiles = (query: Query) => {
	const queryParams = {
		search: query.search,
		status: query.status,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`case`, queryParams)
}

export const createCaseFile = async (caseFile: CaseFilePayload) => {
	const response = await axiosInstanceWithToken.post(`/case`, caseFile)

	return response?.data
}

export const updateCaseFile = async (caseFile: CaseFilePayload) => {
	const response = await axiosInstanceWithToken.put(`/case`, caseFile)

	return response?.data
}

export const getCaseFile = (id: string) => {
	return fetchWithToken(`case/${id}`)
}

export const deleteCaseFile = async (caseId: string) => {
	const response = await axiosInstanceWithToken.delete(`/case`, { data: { caseId } })

	return response?.data
}

export const deleteCaseFiles = async (caseIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/case/bulk`, { data: { caseIds } })

	return response?.data
}

export const getCaseFilesSearch = (query: Query) => {
	const queryParams = {
		search: query.search,
		status: query.status
	}

	return fetchWithToken(`case/search`, queryParams)
}

export const caseAvailable = async (customId: string) => {
	const response = await axiosInstanceWithToken.post(`/case/available`, { customId })

	return response?.data
}
