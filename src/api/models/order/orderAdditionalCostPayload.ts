import { QuantityByProduct } from './orderService'

export interface OrderAdditionalCostPayload {
	additionalCostId: string
	price: number
	quantity: number
	quantityByProduct?: QuantityByProduct[]
}
