import { getStaff } from 'api/services/content/staff'
import { getLanguageSearch } from 'api/services/languages'
import { EditStaffLanguageNavigation } from './EditStaffLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditStaffPage = async ({ params }: Props) => {
	const { data } = await getLanguageSearch()
	const { data: staffData } = await getStaff(params.id)

	return <EditStaffLanguageNavigation languages={data?.languages} staff={staffData?.staffTranslation} />
}

export default EditStaffPage
