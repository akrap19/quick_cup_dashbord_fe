import { Roles } from '../roles/roles'

export interface UserData {
	id?: string
	userId?: string
	firstName: string
	lastName: string
	email?: string
	phoneNumber?: string
	roles: Roles[]
}
