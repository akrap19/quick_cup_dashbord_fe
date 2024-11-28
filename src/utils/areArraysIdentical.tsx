export const areArraysIdentical = (arr1: any[], arr2: any[]) => {
	if (arr1.length !== arr2.length) {
		return false
	}

	const sortedArr1 = [...arr1].sort((a, b) => a.id.localeCompare(b.id))
	const sortedArr2 = [...arr2].sort((a, b) => a.id.localeCompare(b.id))

	return sortedArr1.every((obj, index) => {
		return obj.id === sortedArr2[index].id && obj.name === sortedArr2[index].name
	})
}
