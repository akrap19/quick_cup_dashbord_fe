export const replaceEmptyStringWithNull = (data?: string | null) => {
	return data === '' || !data ? null : data
}
