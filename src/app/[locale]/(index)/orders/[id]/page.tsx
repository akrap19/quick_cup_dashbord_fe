import { getOrder } from 'api/services/orders'

import { OrderDetails } from './OrderDetails'

interface Props {
	params: {
		id: string
	}
}

const OrderDetailsPage = async ({ params }: Props) => {
	const { data: order } = await getOrder(params.id)

	return <OrderDetails order={order} />
}

export default OrderDetailsPage
