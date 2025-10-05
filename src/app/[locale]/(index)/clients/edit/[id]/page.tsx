import { getClient } from 'api/services/clients'

import ClientEdit from './ClientEdit'

const ClientEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getClient(params.id)

	return <ClientEdit client={data} />
}

export default ClientEditPage
