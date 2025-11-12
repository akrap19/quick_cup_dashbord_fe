import { getProduct } from 'api/services/products'

import { RentDetails } from './RentDetails'

interface Props {
	params: {
		id: string
	}
}

const RentDetailsPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)

	return <RentDetails product={productData} />
}

export default RentDetailsPage
