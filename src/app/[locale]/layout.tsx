import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@/style/app.css'
import { Box } from '@/components/layout/box'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Quick cup | Dashboard',
	description: 'Quick cup'
}

const inter = Inter({
	weight: ['400', '600', '700', '800'],
	subsets: ['latin'],
	variable: '--inter-font'
})

type Props = {
	children: ReactNode
	params: { locale: string }
}

const getMessages = async (locale: string) => {
	try {
		return (await import(`../../../messages/${locale}.json`)).default
	} catch (error) {
		return notFound()
	}
}

const LocaleLayout = async ({ children, params: { locale } }: Props) => {
	const messages = await getMessages(locale)

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Box display="flex" height="100vh" backgroundColor="neutral.100">
						{children}
						<ToastContainer />
					</Box>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

export default LocaleLayout
