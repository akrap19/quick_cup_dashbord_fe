import { Product } from 'api/models/products/product'
import { Step1ProductsData } from '@/store/order-wizard'

export const calculateTotalUnits = (step1Data: Step1ProductsData | undefined, allProducts: Product[]): number => {
	if (!step1Data?.products) {
		return 0
	}

	let totalUnits = 0

	for (const formProduct of step1Data.products) {
		const quantity = Number(formProduct.quantity) || 0

		// If quantity is 0, skip (it doesn't contribute to total)
		if (quantity === 0) {
			continue
		}

		// Find the product to get quantityPerUnit
		const product = allProducts.find(p => p.id === formProduct.productId)
		if (!product || !product.quantityPerUnit || product.quantityPerUnit <= 0) {
			// If product not found or quantityPerUnit is invalid, skip
			continue
		}

		// Calculate units for this product: units = quantity / quantityPerUnit
		const units = quantity / product.quantityPerUnit
		totalUnits += units
	}

	return totalUnits
}

export const validateOrderProducts = (
	step1Data: Step1ProductsData | undefined,
	allProducts: Product[],
	selectedItems: Product[]
) => {
	const hasProductsInStore = selectedItems.length > 0
	const hasQuantity = step1Data?.products?.some(p => Number(p.quantity) > 0) || false
	const totalUnits = calculateTotalUnits(step1Data, allProducts)
	const hasMinimumUnits = totalUnits >= 2

	return {
		hasProductsInStore,
		hasQuantity,
		totalUnits,
		hasMinimumUnits,
		isValid: hasProductsInStore && hasQuantity && hasMinimumUnits
	}
}
