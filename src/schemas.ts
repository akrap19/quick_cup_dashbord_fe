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

export const confirmPasswordSchema = z.object({
	confirmPassword: z.string().min(1, { message: 'ValidationMeseges.required' })
})
