import { getProduct } from 'api/services/products'
import { getAllServicesPrices, getServiceLocationsOptions } from 'api/services/services'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getClients } from 'api/services/clients'
import { Base } from 'api/models/common/base'

import BuyEdit from './BuyEdit'

interface Props {
	params: {
		id: string
	}
}

const BuyEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.BUY)
	const data = await getServiceLocationsOptions()
	const { data: clientsData } = await getClients({ search: undefined, page: 1, limit: 300 })
	const users: Base[] =
		clientsData?.users?.map((client: any) => ({
			id: client.userId,
			name: client.companyName
		})) || []

	return <BuyEdit product={productData} servicesPrices={servicesPrices} users={users} serviceLocations={data} />
}

export default BuyEditPage
