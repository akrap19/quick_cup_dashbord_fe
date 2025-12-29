import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Image } from '../common/image'
import { ProductPrice } from './productPrice'
import { Service } from '../services/service'
import { ProductState } from './productState'

export interface Product {
	id: string
	productId: string
	name: string
	productName: string
	description: string
	size: string
	unit: string
	quantityPerUnit: number
	transportationUnit: string
	unitsPerTransportationUnit: number
	images: Image[]
	prices: ProductPrice[]
	acquisitionType: AcquisitionTypeEnum
	servicePrices: Service[]
	productStates: ProductState[]
}
