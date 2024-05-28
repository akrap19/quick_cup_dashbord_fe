import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithoutToken } from 'api/instances/FetchWithoutToken'
import { instance } from 'api/instances/Instance'
import { Login } from 'api/models/auth/login'
import { Register } from 'api/models/auth/register'
import { ResetPassword } from 'api/models/auth/resetPassword'


export const register = async (requestData: Register) => {
	const { data } = await instance.post(`/auth/verify`, requestData)

	return data
}

export const login = async (requestData: Login) => {
	const { data } = await instance.post(`/auth/login`, requestData)

	return data
}

export const refresh = async (refreshToken: string) => {
	instance.defaults.headers['refresh-token'] = refreshToken

	const { data } = await instance.post(`/auth/refresh`)

	return data
}

export const forgotPassword = async (email: string) => {
	const { data } = await instance.post(`/auth/password/forgot`, { email })

	return data
}

export const resetPassword = async (requestData: ResetPassword) => {
	const { data } = await instance.post(`/auth/password/reset`, requestData)

	return data
}

export const logout = async () => {
	const response = await axiosInstanceWithToken.post(`/auth/logout`)

	return response?.data
}

export const getEmail = async (uid: string) => {
	const response = await fetchWithoutToken(`/auth/email?uid=${uid}`)

	return response.json()
}
