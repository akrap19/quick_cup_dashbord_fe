import { getProduct } from 'api/services/products'
import { getAllServicesPrices } from 'api/services/services'
import RentEdit from './RentEdit'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getClients } from 'api/services/clients'
import { Base } from 'api/models/common/base'

interface Props {
	params: {
		id: string
	}
}

const RentEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.RENT)
	const { data: clientsData } = await getClients({ search: '', page: 1, limit: 300 })

	const users: Base[] =
		clientsData?.users?.map((client: any) => ({
			id: client.userId,
			name: client.name
		})) || []

	return <RentEdit product={productData} servicesPrices={servicesPrices} users={users} serviceLocations={[]} />
}

export default RentEditPage
