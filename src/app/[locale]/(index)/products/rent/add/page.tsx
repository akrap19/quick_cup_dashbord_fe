import RentAdd from './RentAdd'
import { getAllServicesPrices } from 'api/services/services'

const RentAddPage = async () => {
	const servicesPrices = await getAllServicesPrices()

	return <RentAdd servicesPrices={servicesPrices} />
}

export default RentAddPage
