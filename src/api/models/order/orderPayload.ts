import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { OrderProduct } from './orderProduct'
import { OrderService } from './orderService'

export interface OrderPayload {
	id?: string
	totalAmount: number
	notes?: string | null
	acquisitionType: AcquisitionTypeEnum
	customerId: string
	eventId?: string
	location?: string
	place: string
	street: string
	contactPerson?: string
	contactPersonContact?: string
	products: OrderProduct[]
	services: OrderService[]
}
