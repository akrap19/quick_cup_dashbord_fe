import { getServerSession } from 'next-auth/next'

import { getAdmin } from 'api/services/admins'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'

import AdminEdit from './AdminEdit'

const AdminEditPage = async ({ params }: { params: { id: string } }) => {
	const session = await getServerSession(authOptions)
	const { data } = await getAdmin(params.id)

	return <AdminEdit admin={data.admin} barnahus={session?.user.barnahusRoles[0]} />
}

export default AdminEditPage
