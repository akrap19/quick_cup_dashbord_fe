import { AboutTemplate } from '../template/aboutTemplate'
import { RoomTemplate } from '../template/roomTemplate'
import { StaffTemplate } from '../template/staffTemplate'

export interface CustomCase {
	name?: string
	caseId?: string
	languageId?: string
	abouts?: AboutTemplate[]
	rooms?: RoomTemplate[]
	staff?: StaffTemplate[]
}
