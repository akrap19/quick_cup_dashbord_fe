import { getRoom } from 'api/services/content/rooms'
import { getLanguage } from 'api/services/languages'

import { EditRoomLanguageNavigation } from './EditRoomLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditRoomPage = async ({ params }: Props) => {
	const { data: roomData } = await getRoom(params.id)
	const { data: languageData } = await getLanguage(roomData?.roomTranslation?.languageId)

	return <EditRoomLanguageNavigation room={roomData?.roomTranslation} language={languageData?.language} />
}

export default EditRoomPage
