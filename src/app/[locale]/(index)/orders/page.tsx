import { getOrders } from 'api/services/orders'
import { Orders } from './Orders'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const OrdersPage = async ({ searchParams }: Props) => {
	const { data: ordersData } = await getOrders(searchParams)
	const isInitialListEmpty =
		(ordersData?.pagination?.count === 0 && !searchParams.search) ||
		ordersData?.orders === null ||
		ordersData?.orders === undefined

	return <Orders ordersData={ordersData} isInitialListEmpty={isInitialListEmpty} />
}

export default OrdersPage
