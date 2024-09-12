import { getAbout } from 'api/services/content/about'
import { getLanguageSearch } from 'api/services/languages'

import { EditAboutLanguageNavigation } from './EditAboutLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditAboutPage = async ({ params }: Props) => {
	const { data } = await getLanguageSearch()
	const { data: aboutData } = await getAbout(params.id)

	return <EditAboutLanguageNavigation languages={data?.languages} about={aboutData?.aboutTranslation} />
}

export default EditAboutPage
