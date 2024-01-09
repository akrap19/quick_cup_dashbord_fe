export const getObjectLength = (object: {}): number => {
	return object ? Object.keys(object).length : 0
}
