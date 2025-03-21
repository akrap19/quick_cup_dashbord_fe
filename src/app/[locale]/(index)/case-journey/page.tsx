import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getCaseFiles } from 'api/services/caseFiles'
import { ROUTES } from 'parameters'
import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const CaseJourneyPage = async ({ searchParams }: Props) => {
	const { data: caseData } = await getCaseFiles(searchParams)
	const isInitialListEmpty = (caseData?.pagination?.count === 0 && !searchParams.search) || caseData === null
	const transformedCaseJourneyArray = caseData?.cases?.map((item: any) => {
		return {
			...item,
			id: item.caseId,
			canAddNotes: item.canAddNotes ? 'Enabled' : 'Disabled'
		}
	})

	console.log('case data', caseData)
	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.caseJourneys"
			title="CaseJourney.noListDataTitle"
			description="CaseJourney.noListDataDescription"
			buttonLabel="CaseJourney.add"
			buttonLink={ROUTES.ADD_CASE_JOURNEY}
		/>
	) : (
		<ListWrapper title="General.caseJourneys">
			<Inputs data={caseData?.cases} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedCaseJourneyArray)}
				pagination={caseData?.pagination}
			/>
		</ListWrapper>
	)
}

export default CaseJourneyPage
