import { ContentPayload } from './contentPayload'

export interface ContentFullPayload {
	translations: ContentPayload[]
	images: string[]
	deletedImages: string[]
}
