import { Audio } from '../common/audio'

export interface RoomImage {
	roomImageId: string
	mediaId: string
	url: string
}

export interface Room {
	roomId: string
	roomTranslationId: string
	title: string
	orderNumber: number
	description: string
	updated: string
	status: string
	audio?: Audio
	roomImages: RoomImage[]
}
