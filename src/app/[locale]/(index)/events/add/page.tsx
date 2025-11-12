import { getClients } from 'api/services/clients'
import EventAdd from './EventAdd'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'

interface Props {
	searchParams: {
		userId: string
	}
}

const EventAddPage = async ({ searchParams }: Props) => {
	const { data: clientsData } = await getClients({ search: searchParams.userId, page: 1, limit: 100 })
	const session = await getServerSession(authOptions)
	const isClient = session?.user?.roles[0]?.name.toLowerCase() === UserRoleEnum.CLIENT

	return <EventAdd isClient={isClient} clients={clientsData?.users} />
}

export default EventAddPage
