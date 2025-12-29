import { Service } from '../services/service'

export interface OrderService {
	serviceId: string
	quantity: number
	price: number
	service?: Service
	serviceLocationId?: string
	serviceLocations?: OrderServiceLocation
	productQuantities?: Record<string, number>
}

export interface OrderServiceLocation {
	id: string
	name: string
	address: string
}
