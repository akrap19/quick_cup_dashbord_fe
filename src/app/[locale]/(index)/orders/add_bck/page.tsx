import { getClients } from 'api/services/clients'
import { OrderAdd } from './OrderAdd'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getEvents } from 'api/services/events'
import { getAdditionalCosts } from 'api/services/additionalCosts'

interface Props {
	searchParams: {
		acquisitionType: AcquisitionTypeEnum
		searchClients: string
		searchEvents: string
		searchAdditionalCosts: string
	}
}

const Page = async ({ searchParams }: Props) => {
	const { data: clientsData } = await getClients({ search: searchParams.searchClients })
	const { data: eventsData } = await getEvents({ search: searchParams.searchEvents })
	const { data: additionalCostsData } = await getAdditionalCosts({
		acquisitionType: searchParams.acquisitionType,
		search: searchParams.searchAdditionalCosts
	})
	const transformedClientArray = clientsData?.users?.map((client: any) => {
		return {
			...client,
			id: client.userId,
			name: client.name
		}
	})
	const transformedEventArray = eventsData?.events?.map((event: any) => {
		return {
			...event,
			id: event.id,
			name: event.title
		}
	})

	return (
		<OrderAdd
			acquisitionType={searchParams.acquisitionType}
			clients={transformedClientArray}
			events={transformedEventArray}
			additionalCosts={additionalCostsData?.additionalCosts}
		/>
	)
}

export default Page
