import { ProductStateLocationEnum } from 'enums/productStateLocationEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'

export interface ProductState {
	id?: string
	status: ProductStateStatusEnum
	location: ProductStateLocationEnum
	productId?: string
	quantity: number
	serviceId?: string
	userId?: string
}
