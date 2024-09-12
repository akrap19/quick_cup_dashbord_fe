import { getLanguageSearch } from 'api/services/languages'

import { AddRoomLanguageNavigation } from './AddRoomLanguageNavigation'

const AddRoomPage = async () => {
	const { data } = await getLanguageSearch()

	return <AddRoomLanguageNavigation languages={data?.languages} />
}

export default AddRoomPage
