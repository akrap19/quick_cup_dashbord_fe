import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { OrderPayload } from 'api/models/order/orderPayload'

interface Query {
	search: string
	page: number
	limit: number
}

export const getOrders = (query: Query) => {
	const queryParams = {
		search: query.search,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`orders`, queryParams)
}

export const createOrder = async (order: OrderPayload) => {
	const response = await axiosInstanceWithToken.post(`/orders`, order)

	return response?.data
}

export const updateOrder = async (order: OrderPayload) => {
	const response = await axiosInstanceWithToken.put(`/orders/${order.id}`, order)

	return response?.data
}

export const getOrder = (orderId: string) => {
	return fetchWithToken(`orders/${orderId}`)
}

export const deleteOrder = async (orderId: string) => {
	const response = await axiosInstanceWithToken.delete(`/orders/${orderId}`)

	return response?.data
}

export const deleteOrders = async (orderIds: string[]) => {
	const response = await axiosInstanceWithToken.delete(`/orders/bulk`, { data: { orderIds } })

	return response?.data
}
