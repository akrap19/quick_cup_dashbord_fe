import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'

export const getSettings = async () => {
	const response = await fetchWithToken(`user/settings`)

	return response.json()
}

export const personal = async (firstName: string, lastName: string) => {
	const response = await axiosInstanceWithToken.put(`/user/personal`, { firstName, lastName })

	return response?.data
}

export const password = async (oldPassword: string, newPassword: string) => {
	const response = await axiosInstanceWithToken.put(`/user/password`, { oldPassword, newPassword })

	return response?.data
}

export const email = async (email: string) => {
	const response = await axiosInstanceWithToken.put(`/user/email`, { email })

	return response?.data
}
