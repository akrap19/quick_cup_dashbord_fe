import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ServicePrice } from './servicePrice'
import { PriceCalculationUnit } from 'enums/priceCalculationUnit'
import { BillingIntervalEnum } from 'enums/billingIntervalEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'

export interface ServicePayload {
	id?: string
	name: string
	description: string | null
	priceCalculationUnit: PriceCalculationUnit
	acquisitionType: AcquisitionTypeEnum
	billingInterval: BillingIntervalEnum
	isDefaultServiceForBuy: boolean
	isDefaultServiceForRent: boolean
	inputTypeForBuy: InputTypeEnum
	inputTypeForRent: InputTypeEnum
	buyPrices: ServicePrice[]
	rentPrices: ServicePrice[]
}
