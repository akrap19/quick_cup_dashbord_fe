import { Metadata } from 'next'
import { ReactNode } from 'react'

import { Drawer } from '@/components/custom/drawer'
import { Navbar } from '@/components/custom/navbar'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { getSettings } from 'api/services/settings'

export const metadata: Metadata = {
	title: 'Journeys | Dashboard',
	description: 'Barnahus Journeys'
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	const { data: settings } = await getSettings()

	return (
		<>
			<Drawer />
			<Box flex="1">
				<Stack>
					<Navbar settings={settings} />
					<Box display="flex" align="center">
						{children}
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default DashboardLayout
