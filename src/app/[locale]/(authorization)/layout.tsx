import { ReactNode } from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import { Box } from '@/components/layout/box'

export const metadata: Metadata = {
	title: 'Journeys | Authorization',
	description: 'Barnahus Journeys'
}

const AuthorizationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			display="flex"
			align="center"
			justify="center"
			flexDirection="column"
			width="100vw"
			height="100vh"
			backgroundColor="neutral.100"
			gap={10}
			paddingBottom={48}>
			<Image src="/images/journeys-logo.svg" width={120} height={28} alt="logo" />
			<Box
				display="flex"
				align="center"
				flexDirection="column"
				backgroundColor="neutral.50"
				boxShadow="medium"
				gap={8}
				padding={10}
				borderRadius="small"
				style={{ width: '456px' }}>
				{children}
			</Box>
		</Box>
	)
}

export default AuthorizationLayout
