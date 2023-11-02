import { ReactNode } from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

export const metadata: Metadata = {
	title: 'Journeys | Authorization',
	description: 'Barnahus Journeys'
}

const AuthorizationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box width="100vw" height="100vh" display="flex" justify="center" align="center" backgroundColor="neutral.100">
			<Stack gap={10} alignItems="center">
				<Image alt="journeyLogo" src="@/components/icons/block-icon/assets/journeys-logo.svg" width={120} height={28} />
				<Box
					backgroundColor="neutral.50"
					boxShadow="medium"
					padding={10}
					borderRadius="small"
					style={{ width: '456px' }}>
					<Stack gap={8} alignItems="center">
						{children}
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}

export default AuthorizationLayout
