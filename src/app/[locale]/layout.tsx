import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'

import '@/style/app.css'

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
		notFound()
	}
}

const LocaleLayout = async ({ children, params: { locale } }: Props) => {
	const messages = await getMessages(locale)

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

export default LocaleLayout
