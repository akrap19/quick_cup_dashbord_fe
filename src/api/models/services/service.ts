import { PriceCalculationUnit } from 'enums/priceCalculationUnit'
import { ServicePrice } from './servicePrice'

export interface Service {
	id: string
	serviceId: string
	name: string
	serviceName: string
	description: string | null
	locations: string
	priceCalculationUnit: PriceCalculationUnit
	prices: ServicePrice[]
}
