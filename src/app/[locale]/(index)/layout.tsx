import { Metadata } from 'next'
import { ReactNode } from 'react'

import { Navbar } from '@/components/custom/navbar'
import { Drawer } from '@/components/custom/drawer'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'

export const metadata: Metadata = {
	title: 'Journeys | Dashboard',
	description: 'Barnahus Journeys'
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<Box display="flex">
			<Drawer />
			<Stack>
				<Navbar />
				<div style={{ backgroundColor: 'green', height: '100%', width: 'auto' }}>{children}</div>
			</Stack>
		</Box>
	)
}

export default DashboardLayout
