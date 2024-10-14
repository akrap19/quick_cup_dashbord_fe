import { AboutTemplate } from './aboutTemplate'
import { RoomTemplate } from './roomTemplate'
import { StaffTemplate } from './staffTemplate'

export interface Template {
	name?: string
	abouts?: AboutTemplate[]
	rooms?: RoomTemplate[]
	staff?: StaffTemplate[]
}
