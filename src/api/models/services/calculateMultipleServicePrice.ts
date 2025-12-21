import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

export interface CalculateMultipleServicePrice {
	products: {
		productId: string
		quantity: number
	}[]
	acquisitionType: AcquisitionTypeEnum
}
