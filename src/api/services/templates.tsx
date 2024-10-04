import { fetchWithToken } from 'api/instances/FetchWithToken'

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
