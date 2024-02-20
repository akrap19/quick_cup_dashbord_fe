import { getAdmin } from 'api/services/admins'

import { AdminDetails } from './AdminDetails'

const AdminsDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getAdmin(params.id)

	return <AdminDetails admin={data.admin} />
}

export default AdminsDetailsPage
