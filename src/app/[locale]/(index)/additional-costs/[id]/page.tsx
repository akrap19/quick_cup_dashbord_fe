import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { getAdditionalCost } from 'api/services/additionalCosts'

import { AdditionalCostsDetails } from './AdditionalCostsDetails'

interface Props {
	params: {
		id: string
	}
}

const AdditionalCostsDetailsPage = async ({ params }: Props) => {
	const { data: additionalCostData } = await getAdditionalCost(params.id)
	const additionalCost = (additionalCostData?.additionalCost ?? additionalCostData) as AdditionalCosts

	return <AdditionalCostsDetails additionalCost={additionalCost} />
}

export default AdditionalCostsDetailsPage

