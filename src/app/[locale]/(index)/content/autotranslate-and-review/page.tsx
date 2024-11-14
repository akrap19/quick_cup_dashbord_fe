import { getLanguage, getLanguageSearch } from 'api/services/languages'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'

import { ContentStepNavigation } from './ContentStepNavigation'

interface Props {
	searchParams: {
		language?: string
		languageId?: string
	}
}

const AutotranslateAndReviewPage = async ({ searchParams }: Props) => {
	const { data: languageData } = await getLanguage(searchParams.languageId)
	const { data: languagesData } = await getLanguageSearch(searchParams, LanguageStatusEnum.DRAFT)

	return <ContentStepNavigation language={languageData?.language} languages={languagesData?.languages} />
}

export default AutotranslateAndReviewPage
