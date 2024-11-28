import { Language } from 'api/models/language/language'
import { getLanguages, getLanguageSupported } from 'api/services/languages'

import LanguageAdd from './LanguageAdd'

interface Props {
	searchParams: {
		language: string
	}
}

const LanguageAddPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguageSupported(searchParams)
	const { data: languagesData } = await getLanguages(searchParams)
	const gotDefaultLanguage = languagesData?.languages?.some((language: Language) => language.isDefault) ?? false

	return <LanguageAdd languages={data.languages} gotDefaultLanguage={gotDefaultLanguage} />
}

export default LanguageAddPage
