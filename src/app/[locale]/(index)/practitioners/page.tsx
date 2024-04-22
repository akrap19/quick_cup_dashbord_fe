import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getPractitioners } from 'api/services/practitioners'
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

const PractitionersPage = async ({ searchParams }: Props) => {
	const { data: practitionersData } = await getPractitioners(searchParams)
	const isInitialListEmpty =
		(practitionersData?.users.length === 0 && !searchParams.search) || practitionersData === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.practitioners"
			title="Practitioners.addNew"
			description="Practitioners.noListDataDescription"
			buttonLabel="Practitioners.add"
			buttonLink={ROUTES.ADD_PRACTITIONERS}
		/>
	) : (
		<ListWrapper>
			<Inputs data={practitionersData?.users} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(practitionersData?.users)}
				pagination={practitionersData.pagination}
			/>
		</ListWrapper>
	)
}

export default PractitionersPage
