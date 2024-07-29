import { getContent } from 'api/services/content'
import { getLanguageSearch } from 'api/services/languages'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'

import { ContentStepNavigation } from './ContentStepNavigation'

interface Props {
	searchParams: {
		language?: string
		languageId?: string
	}
}

const AddContentPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguageSearch(searchParams, LanguageStatusEnum.DRAFT)
	const contentData = await getContent(searchParams)

	return <ContentStepNavigation languages={data?.languages} content={contentData.data} />
}

export default AddContentPage
