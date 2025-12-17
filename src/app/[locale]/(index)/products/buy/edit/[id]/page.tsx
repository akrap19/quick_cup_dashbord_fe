import { getProduct } from 'api/services/products'
import { getAllServicesPrices } from 'api/services/services'

import BuyEdit from './BuyEdit'

interface Props {
	params: {
		id: string
	}
}

const BuyEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices()

	return <BuyEdit product={productData} servicesPrices={servicesPrices} />
}

export default BuyEditPage
