import { z } from 'zod'

export const emailSchema = z.object({
	email: z.string().min(1, { message: 'ValidationMeseges.required' }).email('ValidationMeseges.email')
})

export const passwordSchema = z.object({
	password: z
		.string()
		.min(1, { message: 'ValidationMeseges.required' })
		.regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/, {
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
