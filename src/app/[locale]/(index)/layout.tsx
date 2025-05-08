import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { ReactNode } from 'react'

import { Drawer } from '@/components/custom/drawer'
import { Navbar } from '@/components/custom/navbar'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { getSeenOnboardings } from 'api/services/onboarding'
import { getSettings } from 'api/services/settings'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { ROUTES } from 'parameters'

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	const session = await getServerSession(authOptions)
	const { data: seenOnboardings } = await getSeenOnboardings()
	const { data: settingsData } = await getSettings()
	const userRole = session?.user?.roles[0]?.name

	// This is for protected routes
	if (!session) {
		redirect(ROUTES.LOGIN)
	}

	return (
		<>
			{userRole && <Drawer role={userRole} />}
			<Box flex="1">
				<Stack>
					<Navbar
						session={session}
						settings={settingsData}
						seenOnboardingSections={seenOnboardings?.onboardingSections}
					/>
					<Box display="flex" align="center">
						{children}
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default DashboardLayout
