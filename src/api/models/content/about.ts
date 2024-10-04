import { Audio } from '../common/audio'

export interface AboutImage {
	aboutImageId: string
	mediaId: string
	url: string
}

export interface About {
	aboutId: string
	aboutTranslationId: string
	title: string
	description: string
	updated: string
	status: string
	audio: Audio
	aboutImages: AboutImage[]
}
