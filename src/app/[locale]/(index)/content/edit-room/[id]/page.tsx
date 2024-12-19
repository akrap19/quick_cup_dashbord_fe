import { getRoom } from 'api/services/content/rooms'
import { getLanguage, getLanguageSearch } from 'api/services/languages'

import { EditRoomLanguageNavigation } from './EditRoomLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditRoomPage = async ({ params }: Props) => {
	const { data: roomData } = await getRoom(params.id)
	const { data: languagesData } = await getLanguageSearch()
	const { data: languageData } = await getLanguage(roomData?.roomTranslation?.languageId)

	return (
		<EditRoomLanguageNavigation
			room={roomData?.roomTranslation}
			language={languageData?.language}
			languages={languagesData?.languages}
		/>
	)
}

export default EditRoomPage
