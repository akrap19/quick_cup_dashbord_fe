import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { Box } from '@/components/layout/box'
import { getBarnahustranslations } from 'api/services/barnahuses'
import { getAbouts } from 'api/services/content/about'
import { getRooms } from 'api/services/content/rooms'
import { getStaffs } from 'api/services/content/staff'
import { getLanguageSearch } from 'api/services/languages'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { ROUTES } from 'parameters'

import { ContentTabs } from './contentTabs'

interface Props {
	searchParams: {
		language: string
		languageId: string
		page: number
		limit: number
	}
}

const ContentPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions)
	const { data: barnahusTranslations } = await getBarnahustranslations(session?.user?.barnahusRoles[0]?.barnahusId)
	const { data: languages } = await getLanguageSearch(searchParams)
	const { data: aboutData } = await getAbouts(searchParams)
	const { data: roomsData } = await getRooms(searchParams)
	const { data: staffData } = await getStaffs(searchParams)
	const doesContentHasData =
		barnahusTranslations?.aboutData?.pagination?.count > 0 ||
		barnahusTranslations?.roomsData?.pagination?.count > 0 ||
		barnahusTranslations?.staffData?.pagination?.count > 0

	// return !doesContentHasData ? (
	return false ? (
		<NoListData
			navbarTitle="General.content"
			title="NoListData.letsStart"
			description="ManageContent.noListDataDescription"
			buttonLabel="ManageContent.add"
			buttonLink={ROUTES.ADD_CONTENT}
		/>
	) : (
		<Box paddingTop={8} paddingLeft={10} paddingRight={16} width="100%">
			<ContentTabs
				aboutData={aboutData?.abouts}
				roomsData={roomsData?.rooms}
				staffData={staffData?.staff}
				languages={languages?.languages}
			/>
		</Box>
	)
}

export default ContentPage
