import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

import { setToken } from 'api/Instance'

interface Props {
	children: ReactNode
}

export const TokenHandler = ({ children }: Props) => {
	const session = useSession()

	if (session.status === 'authenticated') {
		setToken(session.data.accessToken)
	}

	return children
}
