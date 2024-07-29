import { fetchWithToken } from 'api/instances/FetchWithToken'

interface Query {
	languageId?: string
}

export const getContent = (query: Query) => {
	const queryParams = {
		languageId: query.languageId
	}

	return fetchWithToken(`content`, { languageId: queryParams.languageId })
}
