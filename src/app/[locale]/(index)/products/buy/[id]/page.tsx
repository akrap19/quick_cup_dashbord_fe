import { getProduct } from 'api/services/products'

import { BuyDetails } from './BuyDetails'

interface Props {
	params: {
		id: string
	}
}

const BuyDetailsPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)

	return <BuyDetails product={productData} />
}

export default BuyDetailsPage
