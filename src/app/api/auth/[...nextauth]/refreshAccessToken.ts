import { JWT } from 'next-auth/jwt'

import { refresh } from 'api/services/auth'

export const refreshAccessToken = async (token: JWT) => {
	const response = await refresh(token.refreshToken)

	const { accessToken, refreshToken, accessTokenExpiresAt } = response.data

	if (accessToken) {
		return {
			...token,
			accessToken,
			accessTokenExpiresAt,
			refreshToken
		}
	}

	return {
		...token,
		error: 'RefreshAccessTokenError'
	}
}
