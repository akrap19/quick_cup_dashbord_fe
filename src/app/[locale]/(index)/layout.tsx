import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { ReactNode } from 'react'

import { Drawer } from '@/components/custom/drawer'
import { Navbar } from '@/components/custom/navbar'
import { Onboarding } from '@/components/custom/onboarding'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { getSeenOnboardings } from 'api/services/onboarding'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'

export const metadata: Metadata = {
	title: 'Journeys | Dashboard',
	description: 'Barnahus Journeys'
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	const session = await getServerSession(authOptions)
	const { data: seenOnboardings } = await getSeenOnboardings()
	const userRole = session?.user?.roles[0]?.name

	return (
		<>
			{!seenOnboardings.onboardingSections.includes(userRole) && <Onboarding userRole={userRole} />}
			{userRole && <Drawer role={userRole} />}
			<Box flex="1">
				<Stack>
					<Navbar session={session} />
					<Box display="flex" align="center">
						{children}
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default DashboardLayout
