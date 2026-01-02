import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductPrice } from './productPrice'
import { Service } from '../services/service'
import { ProductState } from './productState'

export interface ProductPayload {
	id?: string
	name: string
	unit: string
	quantityPerUnit: number
	transportationUnit: string
	unitsPerTransportationUnit: number
	description: string
	imageIds?: string[]
	prices?: ProductPrice[]
	acquisitionType: AcquisitionTypeEnum
	servicePrices?: Service[]
	productStates?: ProductState[]
}
