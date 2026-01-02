import { getProduct } from 'api/services/products'
import { getAllServicesPrices, getServiceLocationsOptions } from 'api/services/services'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getClients } from 'api/services/clients'
import { Base } from 'api/models/common/base'

import RentEdit from './RentEdit'

interface Props {
	params: {
		id: string
	}
}

const RentEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.RENT)
	const data = await getServiceLocationsOptions()
	const { data: clientsData } = await getClients({ search: undefined, page: 1, limit: 300 })
	const users: Base[] =
		clientsData?.users?.map((client: any) => ({
			id: client.userId,
			name: client.companyName
		})) || []

	return <RentEdit product={productData} servicesPrices={servicesPrices} users={users} serviceLocations={data} />
}

export default RentEditPage
