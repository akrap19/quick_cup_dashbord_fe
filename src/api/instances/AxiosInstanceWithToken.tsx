import axios from 'axios'

import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { ROUTES } from 'parameters'

const axiosInstanceWithToken = axios.create({
	baseURL: 'https://barnahus-journeys-be-dev-pjqvrfz4wa-lz.a.run.app/'
})

export const setToken = (token: string, barnahusId: string) => {
	axiosInstanceWithToken.defaults.headers.common.Authorization = `Bearer ${token}`
	axiosInstanceWithToken.defaults.headers['X-Barnahus-Id'] = barnahusId
}

axiosInstanceWithToken.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response.status === 401) {
			ErrorToast(error?.response?.data?.message)

			setTimeout(() => {
				window.location = ROUTES.LOGIN as any
			}, 1500)
		} else {
			ErrorToast(error?.response?.data?.message)
		}
	}
)

export default axiosInstanceWithToken
