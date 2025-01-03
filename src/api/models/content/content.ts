import { About } from './about'
import { Room } from './room'
import { Staff } from './staff'

export interface Content {
	isGeneral?: boolean
	abouts?: About[]
	rooms?: Room[]
	staff?: Staff[]
}
