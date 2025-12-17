import { ServicePrice } from './servicePrice'
import { PriceCalculationUnit } from 'enums/priceCalculationUnit'

export interface ServicePayload {
	id?: string
	name: string
	description: string | null
	priceCalculationUnit: PriceCalculationUnit
	prices: ServicePrice[]
}
