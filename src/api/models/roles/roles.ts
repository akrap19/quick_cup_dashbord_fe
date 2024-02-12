import { Barnahus } from '../barnahuses/barnahus'

export interface Roles {
	id: string
	name: string
	barnahuses: Barnahus[]
}
