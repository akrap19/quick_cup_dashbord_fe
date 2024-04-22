import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { Box } from '@/components/layout/box'
import { getAbouts } from 'api/services/content/about'
import { getRooms } from 'api/services/content/rooms'
import { getStaffs } from 'api/services/content/staff'
import { ROUTES } from 'parameters'

import { ContentTabs } from './contentTabs'

interface Props {
	searchParams: {
		language: string
		page: number
		limit: number
	}
}

const ContentPage = async ({ searchParams }: Props) => {
	const { data: aboutData } = await getAbouts(searchParams)
	const { data: roomsData } = await getRooms(searchParams)
	const { data: staffData } = await getStaffs(searchParams)
	const doesContentHasData = aboutData?.about.length > 0 && roomsData?.rooms.length > 0 && staffData?.staff.length > 0

	return !doesContentHasData ? (
		<NoListData
			navbarTitle="General.content"
			title="NoListData.letsStart"
			description="ManageContent.noListDataDescription"
			buttonLabel="ManageContent.add"
			buttonLink={ROUTES.ADD_CONTENT}
		/>
	) : (
		<Box paddingTop={8} paddingLeft={10} paddingRight={16} width="100%">
			<ContentTabs aboutData={aboutData} roomsData={roomsData} staffData={staffData} />
		</Box>
	)
}

export default ContentPage
