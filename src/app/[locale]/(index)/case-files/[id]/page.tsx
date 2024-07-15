import { getCaseFile } from 'api/services/caseFiles'

import { CaseFilesDetails } from './CaseFilesDetails'

const CaseFileDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getCaseFile(params.id)

	return <CaseFilesDetails caseFiles={data?.case} />
}

export default CaseFileDetailsPage
