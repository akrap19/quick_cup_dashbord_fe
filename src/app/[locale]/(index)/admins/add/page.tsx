import { getServerSession } from 'next-auth/next'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'

import AdminAdd from './AdminAdd'

const AdminEditPage = async () => {
	const session = await getServerSession(authOptions)

	return <AdminAdd barnahus={session?.user.barnahusRoles[0]} />
}

export default AdminEditPage
