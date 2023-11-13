import { ListLayoutWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const CaseFilesPage = () => {
	return (
		<ListLayoutWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListLayoutWrapper>
	)
}

export default CaseFilesPage
