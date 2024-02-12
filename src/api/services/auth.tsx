import { signOut } from 'next-auth/react'

import { axiosInstanceWithToken, instance } from 'api/Instance'
import { Login } from 'api/models/auth/login'
import { Register } from 'api/models/auth/register'
import { ResetPassword } from 'api/models/auth/resetPassword'
import { ROUTES } from 'parameters'

export const register = async (requestData: Register) => {
	const { data } = await instance.post(`/register`, requestData)

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
	const { data } = await instance.post(`/forgotPassword`, { email })

	return data
}

export const resetPassword = async (requestData: ResetPassword) => {
	const { data } = await instance.post(`/resetPassword`, requestData)

	return data
}

export const logout = async () => {
	const { data } = await axiosInstanceWithToken.post(`/auth/logout`)

	if (data.message === 'OK') {
		signOut({ callbackUrl: ROUTES.LOGIN })
	}
}
