import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { AdditionalCostCalculationTypeEnum } from 'enums/additionalCostCalculationTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'

export interface AdditionalCosts {
	id: string
	name: string
	billingType: BillingTypeEnum
	methodOfPayment: MethodOfPayment
	acquisitionType: AcquisitionTypeEnum
	calculationType: AdditionalCostCalculationTypeEnum
	maxPieces?: number
	enableUpload?: boolean
	price: number
	calculationStatus?: ProductStateStatusEnum
}
