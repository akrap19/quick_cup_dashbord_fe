export const replaceEmptyStringWithNull = (data: string | null) => {
	return data === '' ? null : data
}
