import axios from 'axios'
import { getServerSession } from 'next-auth/next'
import qs from 'query-string'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'

export const instance = axios.create({ baseURL: 'https://barnahus-journeys-be-dev-pjqvrfz4wa-lz.a.run.app/' })

export const fetchWithToken = async (endpoint: string, queryParams?: any) => {
	const session = await getServerSession(authOptions)

	const baseUrl = 'https://barnahus-journeys-be-dev-pjqvrfz4wa-lz.a.run.app/'

	const url = qs.stringifyUrl({
		url: baseUrl + endpoint,
		query: queryParams
	})

	const headers: any = {
		'X-Barnahus-Id': session?.user.barnahusRoles[0]?.barnahusId ?? '',
		Authorization: `Bearer ${session?.accessToken}`
	}

	return fetch(url, {
		headers
	})
}

export const fetchWithoutToken = async (endpoint: string, queryParams?: any) => {
	const baseUrl = 'https://barnahus-journeys-be-dev-pjqvrfz4wa-lz.a.run.app/'

	const url = qs.stringifyUrl({
		url: baseUrl + endpoint,
		query: queryParams
	})

	return fetch(url)
}
