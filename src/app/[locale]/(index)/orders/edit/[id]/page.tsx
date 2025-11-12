import { getOrder } from 'api/services/orders'

import OrderEdit from './OrderEdit'

interface Props {
	params: {
		id: string
	}
}

const OrderEditPage = async ({ params }: Props) => {
	const { data: order } = await getOrder(params.id)

	return <OrderEdit order={order} />
}

export default OrderEditPage
