export const formatUnitLabel = (str: string): string => {
	const withSpaces = str?.replace(/([A-Z])/g, ' $1').toLowerCase()

	return withSpaces?.replace(/\b\w/g, char => char.toUpperCase())
}
