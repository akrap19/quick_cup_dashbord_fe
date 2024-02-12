'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

import { TokenHandler } from '@/components/utils/tokenHandler/TokenHandler'

type Props = {
	children: ReactNode
}

const RootLayout = ({ children }: Props) => {
	return (
		<SessionProvider>
			<TokenHandler>{children}</TokenHandler>
		</SessionProvider>
	)
}

export default RootLayout
