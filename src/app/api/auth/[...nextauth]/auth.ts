import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login, refresh, register, resetPassword } from 'api/services/auth'
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
		}),
		CredentialsProvider({
			id: 'refresh-token',
			type: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				const response = await refresh(credentials.refreshToken)

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
			const currentToken = { ...token }

			if (user) {
				currentToken.accessToken = user.accessToken
				currentToken.accessTokenExpiresAt = user.accessTokenExpiresAt
				currentToken.refreshToken = user.refreshToken
				currentToken.user = user as any
			}

			const dateFromString = new Date(currentToken.accessTokenExpiresAt)
			const currentDate = new Date()

			if (currentDate < dateFromString) {
				return currentToken
			}

			return refreshAccessToken(currentToken)
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
