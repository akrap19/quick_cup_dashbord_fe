import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import BuyAdd from './BuyAdd'
import { getAllServicesPrices } from 'api/services/services'

const BuyAddPage = async () => {
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.BUY)

	return <BuyAdd servicesPrices={servicesPrices} />
}

export default BuyAddPage
