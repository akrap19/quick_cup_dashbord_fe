import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductPrice } from './productPrice'
import { Service } from '../services/service'

export interface ProductEditPayload {
	id?: string
	name: string
	size?: string
	unit: string
	quantityPerUnit: number
	transportationUnit: string
	unitsPerTransportationUnit: number
	description: string
	imageIdsToAdd: string[]
	imageIdsToRemove: string[]
	prices: ProductPrice[]
	acquisitionType: AcquisitionTypeEnum
	servicePrices?: Service[]
}
