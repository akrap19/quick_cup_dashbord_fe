import { About } from './about'
import { Room } from './room'
import { Staff } from './staff'

export interface Content {
	abouts?: About[]
	rooms?: Room[]
	staff?: Staff[]
}
