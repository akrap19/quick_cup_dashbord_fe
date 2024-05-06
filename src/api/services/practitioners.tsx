import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'
import { PractitionerPayload } from 'api/models/practitioners/practitionerPayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getPractitioners = async (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	const response = await fetchWithToken(`practitioner`, queryParams)

	return response.json()
}

export const createPractitioner = async (admin: PractitionerPayload) => {
	const response = await axiosInstanceWithToken.post(`/practitioner`, admin)

	return response?.data
}

export const updatePractitioner = async (admin: PractitionerPayload) => {
	const response = await axiosInstanceWithToken.put(`/practitioner`, admin)

	return response?.data
}

export const getPractitioner = async (userId: string) => {
	const response = await fetchWithToken(`practitioner/${userId}`)

	return response.json()
}

export const deletePractitioner = async (userId: string) => {
	const response = await axiosInstanceWithToken.delete(`/practitioner`, { data: { userId } })

	return response?.data
}

export const deletePractitioners = async (userIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/practitioner/bulk`, { data: { userIds } })

	return response?.data
}
