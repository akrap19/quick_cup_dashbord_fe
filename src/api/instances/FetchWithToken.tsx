import { getServerSession } from 'next-auth/next'
import qs from 'query-string'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { ROUTES } from 'parameters'
import { redirect } from 'next/navigation'

export const fetchWithToken = async (endpoint: string, queryParams?: any) => {
	const session = await getServerSession(authOptions)

	const baseUrl = process.env.API_BASE_URL

	const url = qs.stringifyUrl({
		url: baseUrl + endpoint,
		query: queryParams
	})

	const headers: any = {
		'X-Barnahus-Id': session?.user.barnahusRoles[0]?.barnahusId ?? '',
		Authorization: `Bearer ${session?.accessToken}`
	}

	const response = await fetch(url, {
		headers
	})

	const data = await response.json()

	if (data.code === 401001) {
		redirect(ROUTES.LOGIN)
	}

	return data
}
