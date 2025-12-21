import { UserRoleEnum } from 'enums/userRoleEnum'

export const hasRoleAccess = (userRole: string | undefined | null, allowedRoles: UserRoleEnum[]): boolean => {
	if (!userRole || allowedRoles.length === 0) {
		return false
	}

	return allowedRoles.some(allowedRole => allowedRole === userRole)
}
