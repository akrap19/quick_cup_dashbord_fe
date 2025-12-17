import { getProduct } from 'api/services/products'
import { getAllServicesPrices } from 'api/services/services'
import RentEdit from './RentEdit'

interface Props {
	params: {
		id: string
	}
}

const RentEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices()

	return <RentEdit product={productData} servicesPrices={servicesPrices} />
}

export default RentEditPage
