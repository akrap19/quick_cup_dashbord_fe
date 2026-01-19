import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'

export interface AdditionalCostsPayload {
	id?: string
	name: string
	billingType: BillingTypeEnum
	methodOfPayment: MethodOfPayment
	acquisitionType: AcquisitionTypeEnum
	price: number
	calculationStatus?: ProductStateStatusEnum
}
