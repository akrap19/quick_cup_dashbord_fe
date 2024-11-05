export const areAllItemsEmptyInArrayObject = (data: any[]) => {
	return data.every(item =>
		Object.values(item).every(
			value => value === '' || value === undefined || (Array.isArray(value) && value.length === 0)
		)
	)
}
