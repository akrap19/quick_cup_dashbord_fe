import { getLanguageSearch } from 'api/services/languages'
import { AddStaffLanguageNavigation } from './AddStaffLanguageNavigation'

const AddStaffPage = async () => {
	const { data } = await getLanguageSearch()

	return <AddStaffLanguageNavigation languages={data?.languages} />
}

export default AddStaffPage
