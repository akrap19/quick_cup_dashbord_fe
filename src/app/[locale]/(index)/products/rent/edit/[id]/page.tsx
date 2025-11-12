import { getProduct } from 'api/services/products'
import RentEdit from './RentEdit'

interface Props {
	params: {
		id: string
	}
}

const RentEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)

	return <RentEdit product={productData} />
}

export default RentEditPage
