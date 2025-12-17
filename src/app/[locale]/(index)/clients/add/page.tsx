import { getAllProductsPrices } from 'api/services/products'
import ClientAdd from './ClientAdd'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

const ClientAddPage = async () => {
	const productsPrices = await getAllProductsPrices({
		acquisitionType: AcquisitionTypeEnum.BUY
	})

	return <ClientAdd productsPrices={productsPrices} />
}

export default ClientAddPage
