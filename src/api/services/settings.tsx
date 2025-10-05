import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithoutToken } from 'api/instances/FetchWithoutToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'

export const getSettings = async () => {
	return fetchWithToken(`user/settings`)
}

export const personal = async (firstName: string, lastName: string, phoneNumber?: string) => {
	const response = await axiosInstanceWithToken.put(`/user/personal`, {
		firstName,
		lastName,
		phoneNumber: phoneNumber === '' ? null : phoneNumber
	})

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

export const validateEmail = async (uid: string, hash: string) => {
	const response = await fetchWithoutToken(`user/validateEmail/${uid}/${hash}`)

	return response.json()
}
