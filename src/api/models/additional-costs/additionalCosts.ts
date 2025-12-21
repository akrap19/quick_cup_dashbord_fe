import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'

export interface AdditionalCosts {
	id: string
	name: string
	billingType: BillingTypeEnum
	methodOfPayment: MethodOfPayment
	acquisitionType: AcquisitionTypeEnum
	price: number
}
