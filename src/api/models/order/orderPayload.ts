import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { OrderProduct } from './orderProduct'
import { OrderService } from './orderService'
import { OrderAdditionalCostPayload } from './orderAdditionalCostPayload'

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
	additionalCosts: OrderAdditionalCostPayload[]
	contactPerson?: string
	contactPersonContact?: string
	products: OrderProduct[]
	services: OrderService[]
}
