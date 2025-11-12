import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getOrders } from 'api/services/orders'
import { ROUTES } from 'parameters'

import { columns } from './columns'
import { Inputs } from './inputs'

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

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.orders"
			title="Orders.noListDataTitle"
			description="Orders.noListDataDescription"
			buttonLabel="Orders.add"
			buttonLink={ROUTES.ADD_ORDERS}
		/>
	) : (
		<ListWrapper title="General.orders">
			<Inputs data={ordersData.orders} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(ordersData.orders)}
				pagination={ordersData?.pagination}
			/>
		</ListWrapper>
	)
}

export default OrdersPage
