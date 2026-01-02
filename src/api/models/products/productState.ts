import { ProductStateLocationEnum } from 'enums/productStateLocationEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'
import { ServiceLocation } from '../service-locations/serviceLocation'
import { Client } from '../clients/client'

export interface ProductState {
	id?: string
	status: ProductStateStatusEnum
	location: ProductStateLocationEnum
	productId?: string
	quantity: number
	serviceLocationId?: string
	serviceLocation?: ServiceLocation
	userId?: string
	user?: Client
}
