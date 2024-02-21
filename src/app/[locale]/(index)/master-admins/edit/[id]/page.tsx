import { getMasterAdmin } from 'api/services/masterAdmins'

import MasterAdminEdit from './MasterAdminEdit'

const MasterAdminEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getMasterAdmin(params.id)

	return <MasterAdminEdit masterAdmin={data.masterAdmin} />
}

export default MasterAdminEditPage
