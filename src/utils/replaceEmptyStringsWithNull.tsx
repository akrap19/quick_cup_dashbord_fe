export const replaceEmptyStringsWithNull = (data: Array<{ [key: string]: any }>): Array<{ [key: string]: any }> => {
	return data.map(item => {
		const newItem = { ...item }
		Object.keys(newItem).forEach(key => {
			if (newItem[key] === '') {
				newItem[key] = null
			}
		})
		return newItem
	})
}
