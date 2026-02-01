export const validateProductPrices = (prices: any[] | undefined): any[] => {
	return (prices || []).filter(
		(price: any) =>
			price &&
			typeof price.minQuantity === 'number' &&
			!isNaN(price.minQuantity) &&
			price.minQuantity >= 1 &&
			typeof price.price === 'number' &&
			!isNaN(price.price) &&
			price.price >= 0
	)
}

export const validateProductStates = (productStates: any[] | undefined): any[] => {
	return (productStates || []).filter(
		(state: any) =>
			state &&
			state.status &&
			typeof state.status === 'string' &&
			state.status.length > 0 &&
			state.location &&
			typeof state.location === 'string' &&
			state.location.length > 0 &&
			typeof state.quantity === 'number' &&
			!isNaN(state.quantity) &&
			state.quantity >= 1
	)
}
