import { About } from 'api/models/content/about'
import { Content } from 'api/models/content/content'
import { Room } from 'api/models/content/room'
import { Staff } from 'api/models/content/staff'
import { Language } from 'api/models/language/language'
import { AboutTemplate } from 'api/models/template/aboutTemplate'
import { RoomTemplate } from 'api/models/template/roomTemplate'
import { StaffTemplate } from 'api/models/template/staffTemplate'
import { getContent } from 'api/services/content'
import { getLanguages } from 'api/services/languages'
import { getTemplate } from 'api/services/templates'

import { TemplateDetails } from './TemplateDetails'

const TemplatesDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data: languagesData } = await getLanguages({ limit: 1000 })
	const defaultLanguage: Language = languagesData?.languages?.find((language: Language) => language?.isDefault)
	const { data: contentData } = await getContent({ languageId: defaultLanguage?.languageId })
	const { data: templateData } = await getTemplate(params.id)
	const mergedAboutData = contentData?.abouts
		?.map((item: About) => {
			const includeFlag = templateData?.template?.abouts?.find((flag: AboutTemplate) => flag.aboutId === item.aboutId)

			return !includeFlag?.includeAudio && !includeFlag?.includeDescription && !includeFlag?.includeImage
				? null
				: {
						...item,
						audio: includeFlag?.includeAudio ? item.audio : undefined,
						description: includeFlag?.includeDescription ? item.description : '',
						aboutImages: includeFlag?.includeImage ? item.aboutImages : []
					}
		})
		.filter((item: About) => item !== null)
	const mergedRoomData = contentData?.rooms
		?.map((item: Room) => {
			const includeFlag = templateData?.template?.rooms?.find((flag: RoomTemplate) => flag.roomId === item.roomId)

			return !includeFlag?.includeAudio && !includeFlag?.includeDescription && !includeFlag?.includeImage
				? null
				: {
						...item,
						audio: includeFlag?.includeAudio ? item.audio : undefined,
						description: includeFlag?.includeDescription ? item.description : '',
						roomImages: includeFlag?.includeImage ? item.roomImages : []
					}
		})
		.filter((item: Room) => item !== null)
	const mergedStaffData = contentData?.staff
		?.map((item: Staff) => {
			const includeFlag = templateData?.template?.staff?.find((flag: StaffTemplate) => flag.staffId === item.staffId)

			return !includeFlag?.includeDescription && !includeFlag?.includeImage
				? null
				: {
						...item,
						description: includeFlag?.includeDescription ? item.description : '',
						staffImages: includeFlag?.includeImage ? item.staffImages : []
					}
		})
		.filter((item: Staff) => item !== null)
	const mergedContentData: Content = {
		abouts: mergedAboutData as About[],
		rooms: mergedRoomData as Room[],
		staff: mergedStaffData as Staff[]
	}

	return <TemplateDetails templateName={templateData?.template?.name} content={mergedContentData} />
}

export default TemplatesDetailsPage
