import { Pagination } from 'api/models/common/pagination'

export interface Order {
	id: string
	orderNumber: string
	status: string
	totalAmount: number
	customerName: string
	notes: string | null
}

export interface OrdersResponse {
	orders: Order[]
	pagination?: Pagination
}
