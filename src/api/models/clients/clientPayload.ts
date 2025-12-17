import { Product } from '../products/product'

export interface ClientPayload {
	userId?: string
	email?: string
	firstName: string
	lastName: string
	barnahus?: string
	userProfession: string
	phoneNumber: string
	productPrices?: Product[]
}
