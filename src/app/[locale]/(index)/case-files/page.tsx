import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { CaseFile } from 'api/models/caseFiles/caseFile'
import { getCaseFiles } from 'api/services/caseFiles'
import { format } from 'date-fns'
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
	const isInitialListEmpty = (caseFilesData?.cases?.length === 0 && !searchParams.search) || caseFilesData === null
	const transformedAdminArray = caseFilesData?.cases?.map((caseFile: CaseFile) => {
		return {
			...caseFile,
			id: caseFile.caseId,
			caseJourneyUpdates: format(caseFile.updatedAt, 'dd/MM/yyyy')
		}
	})

	console.log('testest', transformedAdminArray)
	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.caseFiles"
			title="CaseFiles.addNew"
			description="CaseFiles.noListDataDescription"
			buttonLabel="CaseFiles.addCustimizedId"
			buttonLink={ROUTES.ADD_CASE_FILES}
		/>
	) : (
		<ListWrapper title="General.caseFiles">
			<Inputs data={caseFilesData?.cases} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedAdminArray)}
				pagination={caseFilesData.pagination}
			/>
		</ListWrapper>
	)
}

export default CaseFilesPage
