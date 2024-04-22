import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'
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
	const { data } = await axiosInstanceWithToken.post(`/practitioner`, admin)

	return data
}

export const updatePractitioner = async (admin: PractitionerPayload) => {
	const { data } = await axiosInstanceWithToken.patch(`/practitioner`, admin)

	return data
}

export const getPractitioner = async (id: string) => {
	const response = await fetchWithToken(`practitioner/${id}`)

	return response.json()
}

export const deletePractitioner = async (id: string) => {
	const { data } = await axiosInstanceWithToken.delete(`/practitioner`, { data: { id } })

	return data
}

export const deletePractitioners = async (ids: string[]) => {
	const { data } = await axiosInstanceWithToken.delete(`/practitioner/bulk`, { data: { ids } })

	return data
}
