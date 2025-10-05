import { getAdmin } from 'api/services/admins'

import AdminEdit from './AdminEdit'

const AdminEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getAdmin(params.id)

	return <AdminEdit admin={data.admin} />
}

export default AdminEditPage
