import { QuantityByProduct } from './orderService'

export interface OrderAdditionalCostPayload {
	additionalCostId: string
	quantity: number
	quantityByProduct?: QuantityByProduct[]
}
