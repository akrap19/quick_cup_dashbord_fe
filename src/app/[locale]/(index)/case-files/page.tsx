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

const CaseFilesPage = async ({ searchParams }: Props) => {
	const { data: caseFilesData } = await getCaseFiles(searchParams)
	const isInitialListEmpty = (caseFilesData?.users.length === 0 && !searchParams.search) || caseFilesData === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.caseFiles"
			title="CaseFiles.addNew"
			description="CaseFiles.noListDataDescription"
			buttonLabel="CaseFiles.add"
			buttonLink={ROUTES.ADD_CASE_FILES}
		/>
	) : (
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={replaceNullInListWithDash(caseFilesData?.caseFiles)} />
		</ListWrapper>
	)
}

export default CaseFilesPage
