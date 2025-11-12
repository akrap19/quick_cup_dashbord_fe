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

const RentPage = async ({ searchParams }: Props) => {
	const { data: rentData } = await getProducts({ ...searchParams, acquisitionType: AcquisitionTypeEnum.RENT })
	const isInitialListEmpty = (rentData?.pagination?.count === 0 && !searchParams.search) || rentData === null
	const transformedRentArray = rentData?.products?.map((rent: any) => {
		return {
			...rent,
			id: rent.id,
			name: rent.name ?? '-',
			description: rent.description ?? '-'
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.rent"
			title="Rent.noListDataTitle"
			description="Rent.noListDataDescription"
			buttonLabel="Rent.add"
			buttonLink={ROUTES.ADD_RENT}
		/>
	) : (
		<ListWrapper title="General.rent">
			<Inputs data={rentData?.products} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedRentArray)}
				pagination={rentData?.pagination}
			/>
		</ListWrapper>
	)
}

export default RentPage
