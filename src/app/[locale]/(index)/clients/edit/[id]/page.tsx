import { getClient } from 'api/services/clients'
import { getAllProductsPrices } from 'api/services/products'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import ClientEdit from './ClientEdit'

const ClientEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getClient(params.id)
	const productsPrices = await getAllProductsPrices({
		acquisitionType: AcquisitionTypeEnum.BUY
	})

	return <ClientEdit client={data} productsPrices={productsPrices} />
}

export default ClientEditPage
