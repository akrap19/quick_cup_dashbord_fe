import { instance } from 'api/Instance'
import { Login } from 'api/models/login'
import { Register } from 'api/models/register'
import { ResetPassword } from 'api/models/resetPassword'

export const register = async (requestData: Register) => {
	const { data } = await instance.post(`/register`, requestData)

	return data
}

export const login = async (requestData: Login) => {
	const { data } = await instance.post(`/login`, requestData)

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
