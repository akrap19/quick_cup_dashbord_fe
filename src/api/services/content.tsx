import { fetchWithToken } from 'api/instances/FetchWithToken'

interface Query {
	language?: string
}

export const getContent = (query: Query) => {
	const queryParams = {
		languageId: query.language
	}

	return fetchWithToken(`content`, { languageId: queryParams.languageId })
}
