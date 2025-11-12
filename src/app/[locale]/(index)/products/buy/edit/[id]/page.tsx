import { getProduct } from 'api/services/products'

import BuyEdit from './BuyEdit'

interface Props {
	params: {
		id: string
	}
}

const BuyEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)

	return <BuyEdit product={productData} />
}

export default BuyEditPage
