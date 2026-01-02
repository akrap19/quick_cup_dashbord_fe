import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import BuyAdd from './BuyAdd'
import { getAllServicesPrices, getServiceLocationsOptions } from 'api/services/services'
import { getClients } from 'api/services/clients'
import { Base } from 'api/models/common/base'

const BuyAddPage = async () => {
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.BUY)
	const { data: clientsData } = await getClients({ search: undefined, page: 1, limit: 300 })
	const data = await getServiceLocationsOptions()
	const users: Base[] =
		clientsData?.users?.map((client: any) => ({
			id: client.userId,
			name: client.companyName
		})) || []

	return <BuyAdd servicesPrices={servicesPrices} users={users} serviceLocations={data} />
}

export default BuyAddPage
