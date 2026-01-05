export interface CalculateMultipleServicePriceResponse {
	serviceId: string
	products: {
		productId: string
		quantity: number
		calculatedQuantity: number
	}[]
	combinedCalculatedQuantity: number
	priceCalculationUnit: string
	unitPrice: number
	totalPrice: number
	priceTier: {
		minQuantity: number
		maxQuantity: number | null
		price: number
	}
}
