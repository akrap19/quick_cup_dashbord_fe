import { UserData } from 'api/models/user/userData'

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken: string
		accessTokenExpiresAt: string
		refreshToken: string
		user: UserData
	}
}

declare module 'next-auth' {
	interface Session {
		accessToken: string
		accessTokenExpiresAt: string
		refreshToken: string
		user: UserData
	}

	interface User {
		accessToken: string
		accessTokenExpiresAt: string
		refreshToken: string
		data: UserData
	}
}
