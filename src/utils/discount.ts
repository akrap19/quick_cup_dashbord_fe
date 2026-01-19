export const applyDiscount = (price: number, discountPercentage?: number): number => {
	if (!discountPercentage || discountPercentage <= 0) {
		return price
	}

	const discountMultiplier = 1 - discountPercentage / 100
	return Number.parseFloat((price * discountMultiplier).toFixed(3))
}

export const reverseDiscount = (discountedPrice: number, discountPercentage?: number): number => {
	if (!discountPercentage || discountPercentage <= 0) {
		return discountedPrice
	}

	const discountMultiplier = 1 - discountPercentage / 100
	if (discountMultiplier === 0) {
		return discountedPrice
	}

	return Number.parseFloat((discountedPrice / discountMultiplier).toFixed(3))
}
