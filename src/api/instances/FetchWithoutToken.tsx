import qs from 'query-string'

export const fetchWithoutToken = async (endpoint: string, queryParams?: any) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

	const url = qs.stringifyUrl({
		url: baseUrl + endpoint,
		query: queryParams
	})

	return fetch(url)
}
