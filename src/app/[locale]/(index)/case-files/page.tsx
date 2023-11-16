import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const CaseFilesPage = () => {
	return (
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListWrapper>
	)
}

export default CaseFilesPage
