import { Product } from '../products/product'

export interface ClientPayload {
	userId?: string
	email?: string
	firstName: string
	lastName: string
	phoneNumber: string
	companyName?: string | null
	pin?: string | null
	street?: string | null
	location?: string | null
	productPrices?: Product[]
}
