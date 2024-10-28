import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters/routes'

const HomePage = async () => {
	const session = await getServerSession(authOptions)
	const userRole = session?.user?.roles[0]?.name

	switch (userRole) {
		case UserRoleEnum.SUPER_ADMIN:
			return redirect(ROUTES.BARNAHUSES)
		case UserRoleEnum.MASTER_ADMIN:
			return redirect(ROUTES.ADMINS)
		case UserRoleEnum.ADMIN:
			return redirect(ROUTES.PRACTITIONERS)
		default:
			redirect(ROUTES.TEMPLATES)
	}

	return null
}

export default HomePage
