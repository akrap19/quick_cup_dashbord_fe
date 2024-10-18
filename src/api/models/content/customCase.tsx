import { AboutCustomCase } from './aboutCustomCase'
import { RoomCustomCase } from './roomCustomCase'
import { StaffCustomCase } from './staffCustomCase'

export interface CustomCase {
	name?: string
	abouts?: AboutCustomCase[]
	rooms?: RoomCustomCase[]
	staff?: StaffCustomCase[]
}
