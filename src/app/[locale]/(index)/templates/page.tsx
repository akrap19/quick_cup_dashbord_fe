import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getTemplates } from 'api/services/templates'
import { format } from 'date-fns'
import { ROUTES } from 'parameters'
import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const TemplatesPage = async ({ searchParams }: Props) => {
	const { data: templatesData } = await getTemplates(searchParams)
	const isInitialListEmpty = (templatesData?.pagination?.count === 0 && !searchParams.search) || templatesData === null
	const transformedTemplateArray = templatesData?.templates?.map((template: any) => {
		return {
			...template,
			id: template.templateId,
			updated: format(template?.updated, 'dd.MM.yyyy HH:mm')
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.templates"
			title="Templates.noListDataTitle"
			description="Templates.noListDataDescription"
			buttonLabel="Templates.add"
			buttonLink={ROUTES.ADD_TEMPLATES}
		/>
	) : (
		<ListWrapper title="General.templates">
			<Inputs data={templatesData?.templates} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(transformedTemplateArray)}
				pagination={templatesData?.pagination}
			/>
		</ListWrapper>
	)
}

export default TemplatesPage
