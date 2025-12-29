import { getOrder } from 'api/services/orders'

import { OrderDetails } from './OrderDetails'
import { Box } from '@/components/layout/box'

interface Props {
	params: {
		id: string
	}
}

const OrderDetailsPage = async ({ params }: Props) => {
	const { data: order } = await getOrder(params.id)

	return (
		<Box
			paddingTop={8}
			paddingX={10}
			width="100%"
			overflow="auto"
			style={{ height: 'calc(100vh - 120px)', maxWidth: '60rem' }}>
			<OrderDetails order={order} />
		</Box>
	)
}

export default OrderDetailsPage
