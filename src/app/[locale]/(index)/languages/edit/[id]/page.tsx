import { Language } from 'api/models/language/language'
import { getLanguage, getLanguages, getLanguageSupported } from 'api/services/languages'

import LanguageEdit from './LanguageEdit'

interface Props {
	searchParams: {
		language: string
	}
	params: { id: string }
}

const LanguageEditPage = async ({ searchParams, params }: Props) => {
	const { data } = await getLanguage(params.id)
	const languageSupported = await getLanguageSupported(searchParams)
	const { data: languagesData } = await getLanguages(searchParams)
	const gotDefaultLanguage =
		(languagesData?.languages?.some((language: Language) => language.isDefault && language.status) &&
			!data?.language?.isDefault) ??
		false

	return (
		<LanguageEdit
			language={data?.language}
			languages={languageSupported?.data?.languages}
			gotDefaultLanguage={gotDefaultLanguage}
		/>
	)
}

export default LanguageEditPage
