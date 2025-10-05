import axios from 'axios'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { getSession, signIn } from 'next-auth/react'
import { ROUTES } from 'parameters'

const axiosInstanceWithToken = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const setToken = (token?: string) => {
	axiosInstanceWithToken.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axiosInstanceWithToken.interceptors.request.use(async request => {
	const session = await getSession()
	const expirationDate = new Date(session?.accessTokenExpiresAt as any)
	const currentDate = new Date()
	const threeMinutesBeforeExpiration = new Date(expirationDate.getTime() - 180000)

	if (currentDate > threeMinutesBeforeExpiration || !request?.headers?.Authorization) {
		const result = await signIn('refresh-token', {
			...session,
			redirect: false
		})

		if (result?.status === 200) {
			const newSession = await getSession()
			setToken(newSession?.accessToken)

			request.headers['Authorization'] = `Bearer ${newSession?.accessToken}`
		} else {
			ErrorToast('Session expired. Redirecting to login...')
			setTimeout(() => {
				window.location.href = ROUTES.LOGIN
			}, 1500)

			return Promise.reject('Session expired')
		}
	}

	return request
})

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
				setToken(newSession?.accessToken)

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
