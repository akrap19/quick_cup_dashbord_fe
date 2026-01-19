import { z } from 'zod'

export const emailSchema = z.object({
	email: z.string().min(1, { message: 'ValidationMeseges.required' }).email('ValidationMeseges.email')
})

export const passwordSchema = z.object({
	password: z
		.string()
		.min(1, { message: 'ValidationMeseges.required' })
		.regex(/^(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9\S]{8,24}$/, {
			message: 'ValidationMeseges.password'
		})
})

export const requiredString = z.object({
	scheme: z.string().min(1, { message: 'ValidationMeseges.required' })
})

export const phoneNumberScheme = z.object({
	phone: z.string().regex(/^(|([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){3,24})$/, 'ValidationMeseges.phone')
})

export const optionalPhoneNumberScheme = z.object({
	phone: z
		.string()
		.regex(/^(|([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){3,24})?$/, 'ValidationMeseges.phone')
})

export const productPriceSchema = z.object({
	minQuantity: z.number().min(1),
	maxQuantity: z.number().min(1).nullish(),
	price: z.number().min(0)
})

export const servicePriceSchema = z.object({
	minQuantity: z.number().min(1),
	maxQuantity: z.number().min(1).nullish(),
	price: z.number().min(0)
})

export const productServicePriceSchema = z.object({
	serviceId: z.string().optional(),
	prices: z
		.array(
			z.object({
				minQuantity: z.number().min(1).optional(),
				maxQuantity: z.number().min(1).optional().nullable(),
				price: z.number().min(0).optional()
			})
		)
		.optional()
		.default([])
})

export const productStateSchema = z
	.object({
		id: z.string().optional(),
		status: z.string().min(1),
		location: z.string().min(1),
		quantity: z.number().min(1),
		serviceLocationId: z.string().optional(),
		userId: z.string().optional()
	})
	.superRefine((data, ctx) => {
		if (data.location === 'service') {
			if (!data.serviceLocationId || data.serviceLocationId.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'ValidationMeseges.required',
					path: ['serviceLocationId']
				})
			}
		}
		if (data.location === 'user') {
			if (!data.userId || data.userId.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'ValidationMeseges.required',
					path: ['userId']
				})
			}
		}
	})

export const orderProductSchema = z.object({
	productId: requiredString.shape.scheme,
	quantity: z.coerce.number().min(0),
	price: z.coerce.number().min(0)
})

export const createStep1Schema = (getProducts: () => import('api/models/products/product').Product[]) => {
	return z.object({
		products: z.array(orderProductSchema).refine(
			formProducts => {
				const products = getProducts()

				// Check if at least one product has quantity > 0
				const hasAnyQuantity = formProducts.some(p => Number(p.quantity) > 0)
				if (!hasAnyQuantity) {
					return false
				}

				// Calculate total units across all products
				let totalUnits = 0

				for (const formProduct of formProducts) {
					const quantity = Number(formProduct.quantity) || 0

					// If quantity is 0, skip (it doesn't contribute to total)
					if (quantity === 0) {
						continue
					}

					// Find the product to get quantityPerUnit
					const product = products.find(p => p.id === formProduct.productId)
					if (!product || !product.quantityPerUnit || product.quantityPerUnit <= 0) {
						// If product not found or quantityPerUnit is invalid, skip
						continue
					}

					// Calculate units for this product: units = quantity / quantityPerUnit
					const units = quantity / product.quantityPerUnit
					totalUnits += units
				}

				// Total units across all products must be at least 2
				return totalUnits >= 2
			},
			{
				message: 'Total units across all products must be at least 2'
			}
		)
	})
}
