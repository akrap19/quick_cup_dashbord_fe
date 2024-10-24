import { getRoom } from 'api/services/content/rooms'
import { RoomDetails } from './RoomDetails'

const RoomPage = async ({ params }: { params: { id: string } }) => {
	const { data: roomData } = await getRoom(params.id)

	return <RoomDetails room={roomData?.roomTranslation} />
}

export default RoomPage
