import { getTemplate } from 'api/services/content'

import { TemplateStepNavigation } from './TemplateStepNavigation'

const TemplatesAddPage = async () => {
	const { data: templateData } = await getTemplate()

	return <TemplateStepNavigation templateData={templateData} />
}

export default TemplatesAddPage
