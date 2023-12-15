'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from 'api/QueryClient'

type Props = {
	children: ReactNode
}

const RootLayout = ({ children }: Props) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default RootLayout
