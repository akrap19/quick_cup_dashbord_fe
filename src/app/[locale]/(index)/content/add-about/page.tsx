import { Language } from 'api/models/language/language'
import { getLanguageSearch } from 'api/services/languages'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'

import { AddAboutLanguageNavigation } from './AddAboutLanguageNavigation'

interface Props {
	searchParams: {
		language?: string
	}
}

const AddAboutPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguageSearch(searchParams, LanguageStatusEnum.PUBLISHED)
	const sortedData = data.languages.sort((a: Language, b: Language) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))

	return <AddAboutLanguageNavigation languages={sortedData} />
}

export default AddAboutPage
