import { Metadata } from 'next'
import { ReactNode } from 'react'

import { Navbar } from '@/components/custom/navbar'

export const metadata: Metadata = {
	title: 'Journeys | Dashboard',
	description: 'Barnahus Journeys'
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
			<Navbar />
			{children}
		</div>
	)
}

export default DashboardLayout
