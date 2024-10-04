import { getTemplate } from 'api/services/content'
import { TemplateStepNavigation } from './TemplateStepNavigation'

interface Props {
	searchParams: {}
}

const TemplatesPage = async ({ searchParams }: Props) => {
	const { data: templateData } = await getTemplate()

	return <TemplateStepNavigation templateData={templateData} />
}

export default TemplatesPage
