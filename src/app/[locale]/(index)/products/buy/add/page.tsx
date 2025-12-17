import BuyAdd from './BuyAdd'
import { getAllServicesPrices } from 'api/services/services'

const BuyAddPage = async () => {
	const servicesPrices = await getAllServicesPrices()

	return <BuyAdd servicesPrices={servicesPrices} />
}

export default BuyAddPage
