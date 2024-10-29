import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { Language } from 'api/models/language/language'
import { getLanguages } from 'api/services/languages'
import { ROUTES } from 'parameters'

import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		status: string
		page: number
		limit: number
	}
}

const LanguagesPage = async ({ searchParams }: Props) => {
	const { data } = await getLanguages(searchParams)
	const isInitialListEmpty = (data?.languages.length === 0 && !searchParams.status) || data === null
	const transformedLanguageArray = data?.languages?.map((language: Language) => {
		return {
			...language,
			id: language.languageId
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.languages"
			title="Languages.addContentLanguage"
			description="Languages.noListDataDescription"
			buttonLabel="Languages.add"
			buttonLink={ROUTES.ADD_LANGUAGES}
		/>
	) : (
		<ListWrapper title="General.languages">
			<Inputs data={data?.languages} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedLanguageArray)}
				pagination={data.pagination}
			/>
		</ListWrapper>
	)
}

export default LanguagesPage
