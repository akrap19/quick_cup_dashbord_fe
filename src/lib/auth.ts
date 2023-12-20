import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login, register } from 'api/services/auth'
import { ROUTES } from 'parameters'

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: ROUTES.LOGIN,
		newUser: ROUTES.REGISTER
	},
	providers: [
		CredentialsProvider({
			id: 'login',
			type: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				const response = await login({
					email: credentials.email,
					password: credentials.password,
					rememberMe: credentials.rememberMe
				})

				if (response.status !== 200) {
					throw new Error('Please check your inputs!')
				}

				const { user, accessToken, refreshToken } = response.data.data

				return {
					...user,
					accessToken,
					refreshToken
				}
			}
		}),
		CredentialsProvider({
			id: 'register',
			type: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				const response = await register({
					email: credentials.email,
					password: credentials.password,
					confirmPassword: credentials.confirmPassword
				})

				if (response.status !== 200) {
					throw new Error('Please check your inputs!')
				}

				const { user, accessToken, refreshToken } = response.data.data

				return {
					...user,
					accessToken,
					refreshToken
				}
			}
		})
	]
}
