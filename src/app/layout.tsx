import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import '@/style/app.css'

import { Footer } from '@/components/custom/footer'
import { Navbar } from '@/components/custom/navbar'

const inter = Inter({
	weight: ['400', '600', '700'],
	subsets: ['latin'],
	variable: '--inter-font'
})

export const metadata: Metadata = {
	title: 'Journeys | Dashboard',
	description: 'Barnahus Journeys'
}

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}

export default RootLayout
