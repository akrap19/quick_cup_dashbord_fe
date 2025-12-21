'use client'

import { useSession } from 'next-auth/react'

import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'

export const useHasRoleAccess = (allowedRoles: UserRoleEnum[]): boolean => {
	const { data: session } = useSession()
	const userRole = session?.user?.roles[0]?.name

	return hasRoleAccess(userRole, allowedRoles)
}
