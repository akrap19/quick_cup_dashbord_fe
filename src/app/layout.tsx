'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from 'api/QueryClient'

type Props = {
	children: ReactNode
}

const RootLayout = ({ children }: Props) => {
	return <SessionProvider>{children}</SessionProvider>
}

export default RootLayout
