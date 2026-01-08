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
