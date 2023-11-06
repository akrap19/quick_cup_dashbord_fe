import { Metadata } from 'next'
import { ReactNode } from 'react'

import { Navbar } from '@/components/custom/navbar'
import { Drawer } from '@/components/custom/drawer'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

export const metadata: Metadata = {
	title: 'Journeys | Dashboard',
	description: 'Barnahus Journeys'
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<Box display="flex" height="100vh">
			<Drawer />
			<Box flex="1">
				<Stack>
					<Navbar />
					<Box flex="1">{children}</Box>
				</Stack>
			</Box>
		</Box>
	)
}

export default DashboardLayout
