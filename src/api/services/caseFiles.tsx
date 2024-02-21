import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
import { CaseFilePayload } from 'api/models/caseFiles/caseFilePayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getCaseFiles = async (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`case-file`, queryParams)

	return response.json()
}

export const createCaseFile = async (caseFile: CaseFilePayload) => {
	const { data } = await axiosInstanceWithToken.post(`/case-file`, caseFile)

	return data
}

export const updateCaseFile = async (caseFile: CaseFilePayload) => {
	const { data } = await axiosInstanceWithToken.patch(`/case-file`, caseFile)

	return data
}

export const getCaseFile = async (id: string) => {
	const response = await fetchWithToken(`case-file/${id}`)

	return response.json()
}

export const deleteCaseFile = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/case-file`, { data: { id } })

	return data
}

export const deleteCaseFiles = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/case-file/bulk`, { data: { ids } })

	return data
}
