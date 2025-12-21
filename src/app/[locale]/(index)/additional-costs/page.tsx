import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getAdditionalCosts } from 'api/services/additionalCosts'
import { ROUTES } from 'parameters'

import { AdditionalCostsTable } from './AdditionalCostsTable'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const AdditionalCostsPage = async ({ searchParams }: Props) => {
	const { data: additionalCostsData } = await getAdditionalCosts(searchParams)
	const isInitialListEmpty =
		(additionalCostsData?.pagination?.count === 0 && !searchParams.search) || additionalCostsData === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.additionalCosts"
			title="AdditionalCosts.noListDataTitle"
			description="AdditionalCosts.noListDataDescription"
			buttonLabel="AdditionalCosts.add"
			buttonLink={ROUTES.ADD_ADDITIONAL_COSTS}
		/>
	) : (
		<ListWrapper title="General.additionalCosts">
			<Inputs data={additionalCostsData?.additionalCosts ?? []} />
			<AdditionalCostsTable
				data={replaceNullInListWithDash(additionalCostsData?.additionalCosts ?? [])}
				pagination={additionalCostsData?.pagination}
			/>
		</ListWrapper>
	)
}

export default AdditionalCostsPage
