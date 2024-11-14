import { Language } from 'api/models/language/language'
import { getLanguageSearch } from 'api/services/languages'

import { AddRoomLanguageNavigation } from './AddRoomLanguageNavigation'

const AddRoomPage = async () => {
	const { data } = await getLanguageSearch()
	const sortedData = data.languages.sort((a: Language, b: Language) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))

	return <AddRoomLanguageNavigation languages={sortedData} />
}

export default AddRoomPage
