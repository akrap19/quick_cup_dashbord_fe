import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductPrice } from './productPrice'
import { Service } from '../services/service'
import { ProductState } from './productState'

export interface ProductEditPayload {
	id?: string
	name: string
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
	productStates?: ProductState[]
}
