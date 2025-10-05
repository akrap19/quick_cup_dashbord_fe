import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getServices } from 'api/services/services'
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

const ServicesPage = async ({ searchParams }: Props) => {
	const { data: servicesData } = await getServices(searchParams)
	const isInitialListEmpty = (servicesData?.pagination?.count === 0 && !searchParams.search) || servicesData === null
	const transformedServiceArray = servicesData?.users?.map((service: any) => {
		return {
			...service,
			id: service.userId,
			name: service.name ?? '-'
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.services"
			title="Services.noListDataTitle"
			description="Services.noListDataDescription"
			buttonLabel="Services.add"
			buttonLink={ROUTES.ADD_SERVICES}
		/>
	) : (
		<ListWrapper title="General.services">
			<Inputs data={servicesData?.users} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedServiceArray)}
				pagination={servicesData?.pagination}
			/>
		</ListWrapper>
	)
}

export default ServicesPage
