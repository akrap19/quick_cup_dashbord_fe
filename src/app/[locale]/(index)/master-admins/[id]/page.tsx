import { getMasterAdmin } from 'api/services/masterAdmins'

import { MasterAdminDetails } from './MasterAdminDetails'

const MasterAdminDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getMasterAdmin(params.id)

	return <MasterAdminDetails masterAdmin={data.masterAdmin} />
}

export default MasterAdminDetailsPage
