import { Pagination } from 'api/models/common/pagination'

export interface Order {
	id: string
	orderNumber: string
	status: string
	totalAmount: number
	customerName: string
	notes: string | null
	location?: string
	place: string
	street: string
}

export interface OrdersResponse {
	orders: Order[]
	pagination?: Pagination
}
