import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getBarnahuseMasterAdminLocations } from 'api/services/barnahuses'
import { getMasterAdmins } from 'api/services/masterAdmins'
import { ROUTES } from 'parameters/routes'

import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		location: string
		page: number
		limit: number
	}
}

const MasterAdminsPage = async ({ searchParams }: Props) => {
	const barnahusLocations = await getBarnahuseMasterAdminLocations()
	const { data: masterAdminsData } = await getMasterAdmins(searchParams)
	const isInitialListEmpty = masterAdminsData?.users.length === 0 && !searchParams.search && !searchParams.location
	const transformedMasterAdminArray = masterAdminsData?.users?.map((masterAdmin: any) => {
		const locations =
			masterAdmin.locations.length === 0 ? '-' : masterAdmin.locations?.join(', ').replace(', ', ' (), ')

		return {
			...masterAdmin,
			id: masterAdmin.userId,
			locations
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.masterAdmins"
			title="MasterAdmins.noListDataTitle"
			description="MasterAdmins.noListDataDescription"
			buttonLabel="MasterAdmins.add"
			buttonLink={ROUTES.ADD_MASTER_ADMINS}
		/>
	) : (
		<ListWrapper title={'General.masterAdmins'}>
			<Inputs data={masterAdminsData?.users} locations={barnahusLocations?.data?.locations} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedMasterAdminArray)}
				pagination={masterAdminsData?.pagination}
			/>
		</ListWrapper>
	)
}

export default MasterAdminsPage
