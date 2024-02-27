import { Barnahus } from '../barnahuses/barnahus'
import { Base } from '../common/base'

export interface Roles extends Base {
	barnahuses: Barnahus[]
}
