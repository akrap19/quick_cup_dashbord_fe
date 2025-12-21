import { PriceCalculationUnit } from 'enums/priceCalculationUnit'
import { ServicePrice } from './servicePrice'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingIntervalEnum } from 'enums/billingIntervalEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'

export interface Service {
	id: string
	serviceId: string
	name: string
	serviceName: string
	description: string | null
	locations: string
	priceCalculationUnit: PriceCalculationUnit
	acquisitionType: AcquisitionTypeEnum
	billingInterval: BillingIntervalEnum
	isDefaultServiceForBuy: boolean
	isDefaultServiceForRent: boolean
	inputTypeForBuy: InputTypeEnum
	inputTypeForRent: InputTypeEnum
	buyPrices: ServicePrice[]
	rentPrices: ServicePrice[]
	prices: ServicePrice[]
}
