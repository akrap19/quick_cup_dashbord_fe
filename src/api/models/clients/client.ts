import { Product } from '../products/product'

export interface Client {
	userId: string
	firstName: string
	lastName: string
	email: string
	status: string
	phoneNumber: string
	companyName?: string | null
	pin?: string | null
	street?: string | null
	location?: string | null
	productPrices: Product[]
}
