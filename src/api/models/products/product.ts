import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

export interface Product {
	id: string
	name: string
	description: string
	acquisitionType: AcquisitionTypeEnum
}
