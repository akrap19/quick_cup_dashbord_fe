import { getRoom } from 'api/services/content/rooms'
import { getLanguageSearch } from 'api/services/languages'
import { EditRoomLanguageNavigation } from './EditRoomLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditRoomPage = async ({ params }: Props) => {
	const { data } = await getLanguageSearch()
	const { data: roomData } = await getRoom(params.id)

	return <EditRoomLanguageNavigation languages={data?.languages} room={roomData?.roomTranslation} />
}

export default EditRoomPage
