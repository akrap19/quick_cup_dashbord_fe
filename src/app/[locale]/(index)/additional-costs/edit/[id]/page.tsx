import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { getAdditionalCost } from 'api/services/additionalCosts'

import AdditionalCostsEdit from './AdditionalCostsEdit'

interface Props {
	params: {
		id: string
	}
}

const AdditionalCostsEditPage = async ({ params }: Props) => {
	const { data: additionalCostData } = await getAdditionalCost(params.id)
	const additionalCost = (additionalCostData?.additionalCost ?? additionalCostData) as AdditionalCosts

	return <AdditionalCostsEdit additionalCost={additionalCost} />
}

export default AdditionalCostsEditPage

