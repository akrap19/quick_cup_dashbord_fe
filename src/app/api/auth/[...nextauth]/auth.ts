import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login, register, resetPassword } from 'api/services/auth'
import { ROUTES } from 'parameters'

import { refreshAccessToken } from './refreshAccessToken'

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: ROUTES.LOGIN
	},
	providers: [
		CredentialsProvider({
			id: 'login',
			type: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				const response = await login({
					email: credentials.email,
					password: credentials.password
				})

				const { user, accessToken, accessTokenExpiresAt, refreshToken } = response.data

				return {
					...user,
					accessToken,
					accessTokenExpiresAt,
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
					uid: credentials.uid,
					password: credentials.password
				})

				const { user, accessToken, accessTokenExpiresAt, refreshToken } = response.data

				return {
					...user,
					accessToken,
					accessTokenExpiresAt,
					refreshToken
				}
			}
		}),
		CredentialsProvider({
			id: 'reset-password',
			type: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				const response = await resetPassword({
					uid: credentials.uid,
					password: credentials.password
				})

				const { user, accessToken, accessTokenExpiresAt, refreshToken } = response.data

				return {
					...user,
					accessToken,
					accessTokenExpiresAt,
					refreshToken
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			const updatedToken = { ...token }

			if (user) {
				updatedToken.accessToken = user.accessToken
				updatedToken.accessTokenExpiresAt = user.accessTokenExpiresAt
				updatedToken.refreshToken = user.refreshToken
				updatedToken.user = user as any
			}

			const dateFromString = new Date(updatedToken.accessTokenExpiresAt)
			const currentDate = new Date()

			if (currentDate < dateFromString) {
				return updatedToken
			}

			return refreshAccessToken(updatedToken)
		},
		async session({ session, token }) {
			const updatedSession = { ...session }

			updatedSession.accessToken = token.accessToken
			updatedSession.refreshToken = token.refreshToken
			updatedSession.user = token.user

			return updatedSession
		}
	}
}
