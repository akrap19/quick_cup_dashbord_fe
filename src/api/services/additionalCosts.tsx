import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { AdditionalCostsPayload } from 'api/models/additional-costs/additionalCostsPayload'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

interface Query {
	search: string
	page?: number
	limit?: number
	acquisitionType?: AcquisitionTypeEnum
}

export const getAdditionalCosts = (query: Query) => {
	const queryParams = {
		search: query.search,
		acquisitionType: query.acquisitionType,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`additional-costs`, queryParams)
}

export const createAdditionalCost = async (additionalCost: AdditionalCostsPayload) => {
	const response = await axiosInstanceWithToken.post(`/additional-costs`, additionalCost)

	return response?.data
}

export const updateAdditionalCost = async (additionalCost: AdditionalCostsPayload) => {
	const response = await axiosInstanceWithToken.put(`/additional-costs/${additionalCost.id}`, additionalCost)

	return response?.data
}

export const getAdditionalCost = (additionalCostId: string) => {
	return fetchWithToken(`additional-costs/${additionalCostId}`)
}

export const deleteAdditionalCost = async (additionalCostId: string) => {
	const response = await axiosInstanceWithToken.delete(`/additional-costs/${additionalCostId}`)

	return response?.data
}

export const deleteAdditionalCosts = async (additionalCostIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/additional-costs/bulk`, { data: { additionalCostIds } })

	return response?.data
}
