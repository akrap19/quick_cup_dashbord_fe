import { CaseFileSearch } from 'api/models/caseFiles/caseFileSearch'
import { getCaseFilesSearch } from 'api/services/caseFiles'
import { getLanguageSearch } from 'api/services/languages'
import { CaseFileEnum } from 'enums/caseFileEnum'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'
import CaseJourneyStepNavigation from './CaseJourneyStepNavigation'

interface Props {
	searchParams: {
		search: string
		language?: string
		languageId?: string
	}
}

const CaseJourneyPage = async ({ searchParams }: Props) => {
	const { data: caseFilesSearchData } = await getCaseFilesSearch({
		search: searchParams.search,
		status: CaseFileEnum.OPEN
	})
	const { data: languageData } = await getLanguageSearch(searchParams, LanguageStatusEnum.DRAFT)
	const transformedCaseFilesSearchData = caseFilesSearchData.map((caseFile: CaseFileSearch) => {
		return {
			id: caseFile.caseId,
			name: caseFile.customId
		}
	})

	return <CaseJourneyStepNavigation caseFiles={transformedCaseFilesSearchData} languages={languageData?.languages} />
}

export default CaseJourneyPage
