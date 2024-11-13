import { Audio } from '../common/audio'

export interface ContentPayload {
	aboutId?: string
	aboutTranslationId?: string
	roomId?: string
	roomTranslationId?: string
	staffId?: string
	staffTranslationId?: string
	languageId?: string
	name?: string | null
	title?: string | null
	description?: string | null
	images?: string[]
	deletedImages?: string[]
	audioId?: string | null
	audio?: Audio
}
