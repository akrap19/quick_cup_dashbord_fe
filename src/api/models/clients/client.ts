import { Product } from '../products/product'

export interface Client {
	userId: string
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	location: string
	status: string
	productPrices: Product[]
}
