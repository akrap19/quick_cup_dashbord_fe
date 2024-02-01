import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login } from 'api/services/auth'
import { ROUTES } from 'parameters'
import { UserData } from 'api/models/user/userData'
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
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken
				token.accessTokenExpiresAt = user.accessTokenExpiresAt
				token.refreshToken = user.refreshToken
				token.user = user as UserData
			}

			const dateFromString = new Date(token.accessTokenExpiresAt)
			const currentDate = new Date()

			if (currentDate < dateFromString) {
				return token
			}

			return refreshAccessToken(token)
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			session.refreshToken = token.refreshToken
			session.user = token.user

			return session
		}
	}
}
