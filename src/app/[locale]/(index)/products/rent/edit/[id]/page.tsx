import { getProduct } from 'api/services/products'
import { getAllServicesPrices } from 'api/services/services'
import RentEdit from './RentEdit'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

interface Props {
	params: {
		id: string
	}
}

const RentEditPage = async ({ params }: Props) => {
	const { data: productData } = await getProduct(params.id)
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.RENT)

	return <RentEdit product={productData} servicesPrices={servicesPrices} />
}

export default RentEditPage
