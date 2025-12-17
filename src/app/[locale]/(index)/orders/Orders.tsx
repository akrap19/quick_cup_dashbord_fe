import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'

import { columns } from './columns'
import { Inputs } from './inputs'
import { NoListDataLayout } from '@/components/custom/no-list-data/NoListDataLayout'
import { Inline } from '@/components/layout/inline'
import { Button } from '@/components/inputs/button'
import { useTranslations } from 'next-intl'
import { ROUTES } from 'parameters'
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon'
import { KeyIcon } from '@/components/icons/key-icon'

interface Props {
	ordersData: any
	isInitialListEmpty: boolean
}

export const Orders = ({ ordersData, isInitialListEmpty }: Props) => {
	const t = useTranslations()

	return isInitialListEmpty ? (
		<NoListDataLayout
			navbarTitle="General.orders"
			title="Orders.noListDataTitle"
			description="Orders.noListDataDescription">
			<Inline justifyContent="center" gap={4}>
				<Button href={ROUTES.BUY} variant="success" size="large">
					<ShoppingBagIcon />
					{t('Orders.createBuyOrder')}
				</Button>
				<Button href={ROUTES.RENT} variant="primary" size="large">
					<KeyIcon />
					{t('Orders.createRentOrder')}
				</Button>
			</Inline>
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
