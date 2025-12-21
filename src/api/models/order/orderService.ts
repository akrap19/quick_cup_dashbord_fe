import { Service } from '../services/service'

export interface OrderService {
	serviceId: string
	quantity: number
	price: number
	service?: Service
	productQuantities?: Record<string, number>
}
