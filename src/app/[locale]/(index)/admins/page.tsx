import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getAdmins } from 'api/services/admins'
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

const AdminsPage = async ({ searchParams }: Props) => {
	const { data: adminsData } = await getAdmins(searchParams)
	const isInitialListEmpty = (adminsData?.pagination?.count === 0 && !searchParams.search) || adminsData === null
	const transformedAdminArray = adminsData?.users?.map((masterAdmin: any) => {
		return {
			...masterAdmin,
			id: masterAdmin.userId
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.admins"
			title="Admins.noListDataTitle"
			description="Admins.noListDataDescription"
			buttonLabel="Admins.add"
			buttonLink={ROUTES.ADD_ADMINS}
		/>
	) : (
		<ListWrapper>
			<Inputs data={adminsData?.users} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedAdminArray)}
				pagination={adminsData?.pagination}
			/>
		</ListWrapper>
	)
}

export default AdminsPage
