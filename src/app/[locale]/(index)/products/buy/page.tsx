import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getProducts } from 'api/services/products'
import { ROUTES } from 'parameters'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const BuyPage = async ({ searchParams }: Props) => {
	const { data: buyData } = await getProducts({ ...searchParams, acquisitionType: AcquisitionTypeEnum.BUY })
	const isInitialListEmpty = (buyData?.pagination?.count === 0 && !searchParams.search) || buyData === null
	const transformedBuyArray = buyData?.products?.map((buy: any) => {
		return {
			...buy,
			id: buy.id,
			name: buy.name ?? '-',
			description: buy.description ?? '-'
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.buy"
			title="Buy.noListDataTitle"
			description="Buy.noListDataDescription"
			buttonLabel="Buy.add"
			buttonLink={ROUTES.ADD_BUY}
		/>
	) : (
		<ListWrapper title="General.buy">
			<Inputs data={buyData?.products} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedBuyArray)}
				pagination={buyData?.pagination}
			/>
		</ListWrapper>
	)
}

export default BuyPage
