import { getMasterAdmin } from 'api/services/masterAdmins'

import BarnahusEdit from './BarnahusEdit'

const BarnahusEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getMasterAdmin(params.id)

	return <BarnahusEdit barnahus={data.barnahus} />
}

export default BarnahusEditPage
