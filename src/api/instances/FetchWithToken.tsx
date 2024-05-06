import { getServerSession } from 'next-auth/next'
import qs from 'query-string'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { ROUTES } from 'parameters'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'

const fetchWithToken = async (endpoint: string, queryParams?: any) => {
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

	const response = await fetch(url, {
		headers
	})

	return response.json()
}

export const dataFetchWithToken = async (endpoint: string, queryParams?: any) => {
	const data = await fetchWithToken(endpoint, queryParams)

	if (data?.code === 401001) {
		return { data: { showList: true } }
	} else if (data?.code === 200000) {
		return data
	} else {
		return { data: { showList: true } }
	}
}
