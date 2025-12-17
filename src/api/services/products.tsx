import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ProductPayload } from 'api/models/products/productPayload'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductEditPayload } from 'api/models/products/productEditPayload'

interface Query {
	search?: string
	page?: number
	limit?: number
	acquisitionType?: AcquisitionTypeEnum
}

export const getProducts = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10,
		acquisitionType: query.acquisitionType
	}

	return fetchWithToken(`products`, queryParams)
}

export const createProduct = async (product: ProductPayload) => {
	const response = await axiosInstanceWithToken.post(`/products`, product)

	return response?.data
}

export const updateProduct = async (product: ProductEditPayload) => {
	const response = await axiosInstanceWithToken.put(`/products/${product.id}`, product)

	return response?.data
}

export const getProduct = (productId: string) => {
	return fetchWithToken(`products/${productId}`)
}

export const deleteProduct = async (productId: string) => {
	const response = await axiosInstanceWithToken.delete(`/products/${productId}`)

	return response?.data
}

export const deleteProducts = async (productIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/products/bulk`, {
		data: { productIds }
	})

	return response?.data
}

export const getAllProductsPrices = async (query: Query) => {
	const queryParams = {
		acquisitionType: query.acquisitionType
	}

	const response = await fetchWithToken(`products/prices`, queryParams)

	return response?.data
}
