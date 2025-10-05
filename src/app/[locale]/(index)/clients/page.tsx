import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getClients } from 'api/services/clients'
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

const ClientsPage = async ({ searchParams }: Props) => {
	const { data: clientsData } = await getClients(searchParams)
	const isInitialListEmpty = (clientsData?.users?.length === 0 && !searchParams.search) || clientsData === null
	const transformedClientArray = clientsData?.users?.map((client: any) => {
		return {
			...client,
			id: client.userId,
			name: client.name,
			email: client.email,
			phoneNumber: client.phoneNumber
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.clients"
			title="Clients.addNew"
			description="Clients.noListDataDescription"
			buttonLabel="Clients.add"
			buttonLink={ROUTES.ADD_CLIENTS}
		/>
	) : (
		<ListWrapper title="General.clients">
			<Inputs data={transformedClientArray} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedClientArray)}
				pagination={clientsData.pagination}
			/>
		</ListWrapper>
	)
}

export default ClientsPage
