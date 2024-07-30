import { getLanguage } from 'api/services/languages'

import LanguageDetails from './LanguageDetails'

const LanguageDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getLanguage(params.id)

	return <LanguageDetails language={data?.language} />
}

export default LanguageDetailsPage
