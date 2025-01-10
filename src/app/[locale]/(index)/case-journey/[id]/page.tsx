import { getCaseFile } from 'api/services/caseFiles'
import { getCase } from 'api/services/content'
import { CaseJourneyDetails } from './CaseJourneyDetails'

const CaseJourneyDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data: CaseJourneyData } = await getCase(params.id)
	const { data: CaseFilesData } = await getCaseFile(params.id)
	const CaseJourneyReversedData = {
		abouts: CaseJourneyData?.content?.abouts?.reverse(),
		rooms: CaseJourneyData?.content?.rooms?.reverse(),
		staff: CaseJourneyData?.content?.staff?.reverse()
	}

	return <CaseJourneyDetails caseJourneyName={CaseFilesData?.case?.customId} content={CaseJourneyReversedData} />
}

export default CaseJourneyDetailsPage
