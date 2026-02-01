import { AdditionalCosts } from '../additional-costs/additionalCosts'
import { QuantityByProduct } from './orderService'

export interface OrderAdditionalCost {
	id: string
	orderId: string
	additionalCostId: string
	additionalCost: AdditionalCosts
	quantity: number | null
	quantityByProduct?: QuantityByProduct[]
	createdAt: string
	updatedAt: string
}
