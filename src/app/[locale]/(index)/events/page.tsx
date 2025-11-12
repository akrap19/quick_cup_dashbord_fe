import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getEvents } from 'api/services/events'
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

const EventsPage = async ({ searchParams }: Props) => {
	const { data: eventsData } = await getEvents(searchParams)
	const isInitialListEmpty = (eventsData?.pagination?.count === 0 && !searchParams.search) || eventsData === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.events"
			title="Events.noListDataTitle"
			description="Events.noListDataDescription"
			buttonLabel="Events.add"
			buttonLink={ROUTES.ADD_EVENTS}
		/>
	) : (
		<ListWrapper title="General.events">
			<Inputs data={eventsData?.events ?? []} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(eventsData?.events ?? [])}
				pagination={eventsData?.pagination}
			/>
		</ListWrapper>
	)
}

export default EventsPage
