import { getStaff } from 'api/services/content/staff'
import { getLanguage, getLanguageSearch } from 'api/services/languages'

import { EditStaffLanguageNavigation } from './EditStaffLanguageNavigation'

interface Props {
	params: {
		id: string
	}
}

const EditStaffPage = async ({ params }: Props) => {
	const { data: staffData } = await getStaff(params.id)
	const { data: languagesData } = await getLanguageSearch()
	const { data: languageData } = await getLanguage(staffData?.staffTranslation?.languageId)

	return (
		<EditStaffLanguageNavigation
			staff={staffData?.staffTranslation}
			language={languageData?.language}
			languages={languagesData?.languages}
		/>
	)
}

export default EditStaffPage
