import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'

import { columns } from './columns'
import { Inputs } from './inputs'
import { NoListDataLayout } from '@/components/custom/no-list-data/NoListDataLayout'
import { OrderActionButtons } from './orderActionButtons'

interface Props {
	ordersData: any
	isInitialListEmpty: boolean
}

export const Orders = ({ ordersData, isInitialListEmpty }: Props) => {
	return isInitialListEmpty ? (
		<NoListDataLayout
			navbarTitle="General.orders"
			title="Orders.noListDataTitle"
			description="Orders.noListDataDescription">
			<OrderActionButtons />
		</NoListDataLayout>
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
