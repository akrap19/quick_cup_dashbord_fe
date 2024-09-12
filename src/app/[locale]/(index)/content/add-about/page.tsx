import { getLanguageSearch } from 'api/services/languages'

import { AddAboutLanguageNavigation } from './AddAboutLanguageNavigation'

const AddAboutPage = async () => {
	const { data } = await getLanguageSearch()

	return <AddAboutLanguageNavigation languages={data?.languages} />
}

export default AddAboutPage
