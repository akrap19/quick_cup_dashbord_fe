import { getCaseFile } from 'api/services/caseFiles'

import CaseFilesEdit from './CaseFilesEdit'

const CaseFilesEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getCaseFile(params.id)

	return <CaseFilesEdit caseFile={data.case} />
}

export default CaseFilesEditPage
