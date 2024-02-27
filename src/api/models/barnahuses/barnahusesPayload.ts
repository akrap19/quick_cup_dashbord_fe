import { Base } from '../common/base'

export interface BarnahusPayload extends Base {
	location: string
	adminId?: string
}
