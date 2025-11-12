export interface OrderPayload {
	id?: string
	orderNumber: string
	status: string
	totalAmount: number
	customerName: string
	notes?: string | null
}
