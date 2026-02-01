import { Product } from '../products/product'

export interface OrderProduct {
	id?: string
	orderId?: string
	productId: string
	product?: Product
	quantity: number
	createdAt?: string
	updatedAt?: string
}
