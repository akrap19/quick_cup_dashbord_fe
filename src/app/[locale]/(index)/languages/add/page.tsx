import { getLanguageSupported } from 'api/services/languages'

import LanguageAdd from './LanguageAdd'

interface Props {
	searchParams: {
		language: string
	}
}

const LanguageAddPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguageSupported(searchParams)

	return <LanguageAdd languages={data.languages} />
}

export default LanguageAddPage
