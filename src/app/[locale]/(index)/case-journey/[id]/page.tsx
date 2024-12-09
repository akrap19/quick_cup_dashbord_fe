import { getCaseFile } from 'api/services/caseFiles'
import { getCase } from 'api/services/content'
import { CaseJourneyDetails } from './CaseJourneyDetails'

const CaseJourneyDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data: CaseJourneyData } = await getCase(params.id)
	const { data: CaseFilesData } = await getCaseFile(params.id)

	return <CaseJourneyDetails caseJourneyName={CaseFilesData?.case?.customId} content={CaseJourneyData?.content} />
}

export default CaseJourneyDetailsPage
