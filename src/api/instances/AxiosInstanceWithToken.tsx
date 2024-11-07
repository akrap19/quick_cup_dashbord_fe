import axios from 'axios'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { getSession, signIn } from 'next-auth/react'
import { ROUTES } from 'parameters'

const axiosInstanceWithToken = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const setToken = (token?: string, barnahusId?: string) => {
	axiosInstanceWithToken.defaults.headers.common['Authorization'] = `Bearer ${token}`
	axiosInstanceWithToken.defaults.headers['X-Barnahus-Id'] = barnahusId ?? ''
}

axiosInstanceWithToken.interceptors.response.use(
	response => response,
	async error => {
		if (error?.response?.data?.code === 401001) {
			const session = await getSession()
			const result = await signIn('refresh-token', {
				...session,
				redirect: false
			})

			if (result?.status === 200) {
				const newSession = await getSession()
				setToken(newSession?.accessToken, newSession?.user?.barnahusRoles[0]?.barnahusId)

				return axiosInstanceWithToken(error.config)
			} else {
				ErrorToast(error?.response?.data?.message)
				setTimeout(() => {
					window.location = ROUTES.LOGIN as any
				}, 1500)
			}
		} else {
			ErrorToast(error?.response?.data?.message)
		}
	}
)

export default axiosInstanceWithToken
