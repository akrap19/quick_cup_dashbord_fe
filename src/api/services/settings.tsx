import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'

export const getSettings = async () => {
	const response = await fetchWithToken(`user/settings`)

	return response.json()
}

export const personal = async (firstName: string, lastName: string) => {
	const { data } = await axiosInstanceWithToken.patch(`/user/personal`, { firstName, lastName })

	return data
}

export const password = async (oldPassword: string, newPassword: string) => {
	const { data } = await axiosInstanceWithToken.patch(`/user/password`, { oldPassword, newPassword })

	return data
}

export const email = async (email: string) => {
	const { data } = await axiosInstanceWithToken.patch(`/user/email`, { email })

	return data
}
