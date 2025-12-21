export const emptyToDash = (value: string | null | undefined): string => {
	if (value === null || value === undefined || value === '') {
		return '-'
	}
	return value
}

