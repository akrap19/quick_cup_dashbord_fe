import { getLanguageSearch } from 'api/services/languages'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'

import { ContentStepNavigation } from './ContentStepNavigation'

interface Props {
	searchParams: {
		language?: string
	}
}

const AddContentPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguageSearch(searchParams, LanguageStatusEnum.DRAFT)

	return <ContentStepNavigation languages={data?.languages} />
}

export default AddContentPage
