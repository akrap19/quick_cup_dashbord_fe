import { getClient } from 'api/services/clients'

import { ClientDetails } from './ClientDetails'

const ClientsDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getClient(params.id)

	return <ClientDetails client={data} />
}

export default ClientsDetailsPage
