export const stripLocale = (value: string) => {
	const withoutLocale = value.replace(/^\/[a-z]{2,3}(?=\/|$)/i, '')
	return withoutLocale.length ? withoutLocale : '/'
}
