import { AboutTemplate } from './aboutTemplate'
import { RoomTemplate } from './roomTemplate'
import { StaffTemplate } from './staffTemplate'

export interface Template {
	name?: string
	isGeneral?: boolean
	password?: string
	abouts?: AboutTemplate[]
	rooms?: RoomTemplate[]
	staff?: StaffTemplate[]
}
