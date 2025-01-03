import { Content } from 'api/models/content/content'
import { Template } from 'api/models/template/template'
import { Templates } from 'api/models/template/templates'
import { getContent } from 'api/services/content'
import { getLanguageSearch } from 'api/services/languages'
import { getTemplate, getTemplatesSearch } from 'api/services/templates'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'

import CaseJourneyStepNavigation from './CaseJourneyStepNavigation'

interface Props {
	searchParams: {
		customId: string
		template?: string
		templateId?: string
		language?: string
		languageId?: string
	}
}

const CaseJourneyAddPage = async ({ searchParams }: Props) => {
	const { data: languageData } = await getLanguageSearch(searchParams, LanguageStatusEnum.PUBLISHED)
	const data = await getContent(searchParams)
	const { data: templateSearchData } = await getTemplatesSearch({
		search: searchParams.template
	})
	const transformedTemplateSearchData = templateSearchData?.templates?.map((template: Templates) => {
		return {
			id: template.templateId,
			name: template.name
		}
	})

	const { data: templateData } = await getTemplate(searchParams.templateId)

	const processData = (data: Content, template: Template) => {
		const filteredAbouts = template?.abouts
			?.map(templateAbout => {
				const about = data?.abouts?.find(a => a.aboutId === templateAbout.aboutId)

				if (about) {
					if (!templateAbout.includeDescription && !templateAbout.includeImages && !templateAbout.includeAudio) {
						return null
					}

					return {
						aboutId: about.aboutId,
						title: about.title,
						description: templateAbout.includeDescription ? about.description : null,
						audioURL: templateAbout.includeAudio ? about.audioURL : null,
						aboutImages: templateAbout.includeImages ? about.aboutImages : []
					}
				}
				return null
			})
			.filter(Boolean)

		const filteredRooms = template?.rooms
			?.map(templateRoom => {
				const room = data?.rooms?.find(r => r.roomId === templateRoom.roomId)

				if (room) {
					if (!templateRoom.includeDescription && !templateRoom.includeImages && !templateRoom.includeAudio) {
						return null
					}

					return {
						roomId: room.roomId,
						title: room.title,
						description: templateRoom.includeDescription ? room.description : null,
						audioURL: templateRoom.includeAudio ? room.audio : null,
						roomImages: templateRoom.includeImages ? room.roomImages : [],
						orderNumber: templateRoom.orderNumber
					}
				}
				return null
			})
			.filter(Boolean)
			.sort((a, b) => {
				if (a?.orderNumber === undefined) return 1
				if (b?.orderNumber === undefined) return -1
				return a.orderNumber - b.orderNumber
			})

		const filteredStaff = template?.staff
			?.map(templateStaff => {
				const staff = data?.staff?.find(s => s.staffId === templateStaff.staffId)

				if (staff) {
					if (!templateStaff.includeName && !templateStaff.includeDescription && !templateStaff.includeImages) {
						return null
					}

					return {
						staffId: staff.staffId,
						title: templateStaff.includeName ? staff.title : null,
						description: templateStaff.includeDescription ? staff.description : null,
						staffImages: templateStaff.includeImages ? staff.staffImages : []
					}
				}
				return null
			})
			.filter(Boolean)
		return {
			isGeneral: template?.isGeneral,
			abouts: filteredAbouts,
			rooms: filteredRooms,
			staff: filteredStaff
		}
	}
	const template = processData(data.data, templateData?.template)

	return (
		<CaseJourneyStepNavigation
			languages={languageData?.languages}
			content={data.data}
			templates={transformedTemplateSearchData}
			template={template as any}
		/>
	)
}

export default CaseJourneyAddPage
