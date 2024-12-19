import { getAbout } from 'api/services/content/about'
import { getLanguage, getLanguageSearch } from 'api/services/languages'

import { EditAboutLanguageNavigation } from './EditAboutLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditAboutPage = async ({ params }: Props) => {
	const { data: aboutData } = await getAbout(params.id)
	const { data: languagesData } = await getLanguageSearch()
	const { data: languageData } = await getLanguage(aboutData?.aboutTranslation?.languageId)

	return (
		<EditAboutLanguageNavigation
			about={aboutData?.aboutTranslation}
			language={languageData?.language}
			languages={languagesData?.languages}
		/>
	)
}

export default EditAboutPage
