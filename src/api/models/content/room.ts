interface RoomImage {
	roomImageId: string
	url: string
}

export interface Room {
	roomId: string
	roomTranslationId: string
	title: string
	description: string
	updated: string
	status: string
	roomimages: RoomImage[]
}
