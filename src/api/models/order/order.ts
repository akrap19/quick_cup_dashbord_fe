import { Pagination } from 'api/models/common/pagination'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { OrderProduct } from './orderProduct'
import { OrderService } from './orderService'
import { OrderAdditionalCost } from './orderAdditionalCost'
import { Client } from '../clients/client'
import { Event } from '../event/event'

export interface Order {
	id: string
	orderNumber: string
	status: string
	totalAmount: number
	customerName: string
	notes: string | null
	discount?: number
	customerId?: string
	customer: Client
	location?: string
	place: string
	street: string
	acquisitionType?: AcquisitionTypeEnum
	eventId?: string
	event?: Event
	contactPerson?: string
	contactPersonContact?: string
	products?: OrderProduct[]
	services?: OrderService[]
	additionalCosts?: OrderAdditionalCost[]
}

export interface OrdersResponse {
	orders: Order[]
	pagination?: Pagination
}
