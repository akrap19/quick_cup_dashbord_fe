export const replaceNullInListWithDash = (data: any[]): any[] => {
	return data.map(item => {
		const newItem: any = {}
		Object.keys(item).forEach(key => {
			if (item[key] === null) {
				newItem[key] = '-'
			} else {
				newItem[key] = item[key]
			}
		})
		return newItem
	})
}
