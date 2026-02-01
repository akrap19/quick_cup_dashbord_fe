import { Service } from '../services/service'

export interface QuantityByProduct {
	productId: string
	quantity?: number
	fileId?: string
	fileUrl?: string
}

export interface OrderService {
	serviceId: string
	quantity: number
	service?: Service
	serviceLocationId?: string
	serviceLocations?: OrderServiceLocation
	productQuantities?: Record<string, number>
	quantityByProduct?: QuantityByProduct[]
}

export interface OrderServiceLocation {
	id: string
	name: string
	address: string
}
