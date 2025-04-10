import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
	locales: ['en', 'sv', 'bg', 'de', 'dk', 'ee', 'slo', 'esp', 'fi', 'is', 'lt', 'lv', 'no', 'pl'],
	defaultLocale: 'en'
})

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
