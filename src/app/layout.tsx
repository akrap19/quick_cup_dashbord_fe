'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from 'api/QueryClient'

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
