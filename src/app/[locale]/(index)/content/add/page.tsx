import { Language } from 'api/models/language/language'
import { getLanguageSearch } from 'api/services/languages'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'

import { ContentStepNavigation } from './ContentStepNavigation'

interface Props {
	searchParams: {
		language?: string
	}
}

const AddContentPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguageSearch(searchParams, LanguageStatusEnum.DRAFT)
	const transformedLanguageArray = data.languages?.map((language: Language) => {
		return {
			id: language.languageId,
			name: language.name
		}
	})

	return <ContentStepNavigation languages={transformedLanguageArray} />
}

export default AddContentPage
