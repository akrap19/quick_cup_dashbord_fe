import { getStaff } from 'api/services/content/staff'

import { StaffDetails } from './StaffDetails'

const StaffPage = async ({ params }: { params: { id: string } }) => {
	const { data: staffData } = await getStaff(params.id)

	return <StaffDetails staff={staffData?.staffTranslation} />
}

export default StaffPage
