import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ProductPayload } from 'api/models/products/productPayload'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductEditPayload } from 'api/models/products/productEditPayload'
import { productStatesPayload } from 'api/models/products/productStatesPayload'

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

export const updateProduct = async (id: string, product: ProductEditPayload) => {
	const response = await axiosInstanceWithToken.put(`/products/${id}`, product)

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

export const bulkUpdateProductStates = async (updates: productStatesPayload[]) => {
	const response = await axiosInstanceWithToken.post(`/products/bulk-update-product-states`, { updates })

	return response?.data
}

export const getDesignTemplate = async (productId: string) => {
	const response = await axiosInstanceWithToken.get(`/products/${productId}/design-template`)

	return response?.data
}

export const downloadDesignTemplate = async (productId: string, filename?: string) => {
	const response = await axiosInstanceWithToken.get(`/products/${productId}/design-template`, {
		responseType: 'blob'
	})

	// Extract filename from Content-Disposition header if available
	let downloadFilename = filename
	if (!downloadFilename) {
		const contentDisposition = response.headers['content-disposition']
		if (contentDisposition) {
			const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
			if (filenameMatch && filenameMatch[1]) {
				downloadFilename = filenameMatch[1].replace(/['"]/g, '')
			}
		}
	}

	// Default filename if still not set
	if (!downloadFilename) {
		downloadFilename = `design-template-${productId}`
	}

	// Create blob URL and trigger download
	const blob = new Blob([response.data])
	const url = window.URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = downloadFilename
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()

	// Clean up
	setTimeout(() => {
		document.body.removeChild(link)
		window.URL.revokeObjectURL(url)
	}, 100)
}

export const getMyProducts = async (userId?: string) => {
	const response = await fetchWithToken(`products/my-products`, {
		userid: userId ?? undefined,
		search: undefined,
		page: 1,
		limit: 100
	})

	return response?.data
}
