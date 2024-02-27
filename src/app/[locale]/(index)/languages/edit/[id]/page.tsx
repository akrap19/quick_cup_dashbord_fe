import { getLanguage, getLanguageSupported } from 'api/services/languages'

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

	return <LanguageEdit language={data?.language} languages={languageSupported?.data?.languages} />
}

export default LanguageEditPage
