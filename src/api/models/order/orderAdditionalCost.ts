import { AdditionalCosts } from '../additional-costs/additionalCosts'

export interface OrderAdditionalCost {
	id: string
	orderId: string
	additionalCostId: string
	additionalCost: AdditionalCosts
	price: number
	quantity: number | null
	createdAt: string
	updatedAt: string
}
