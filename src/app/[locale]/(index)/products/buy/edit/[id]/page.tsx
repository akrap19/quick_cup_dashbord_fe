import { getProduct } from 'api/services/products'
import { getAllServicesPrices } from 'api/services/services'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import BuyEdit from './BuyEdit'

interface Props {
	params: {
		id: string
	}
}

const BuyEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.BUY)

	return <BuyEdit product={productData} servicesPrices={servicesPrices} />
}

export default BuyEditPage
