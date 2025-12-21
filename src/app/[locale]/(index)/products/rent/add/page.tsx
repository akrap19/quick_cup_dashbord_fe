import RentAdd from './RentAdd'
import { getAllServicesPrices } from 'api/services/services'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

const RentAddPage = async () => {
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.RENT)

	return <RentAdd servicesPrices={servicesPrices} />
}

export default RentAddPage
