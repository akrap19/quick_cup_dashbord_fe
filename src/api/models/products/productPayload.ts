import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

export interface ProductPayload {
	id?: string
	name: string
	description: string
	acquisitionType: AcquisitionTypeEnum
}
