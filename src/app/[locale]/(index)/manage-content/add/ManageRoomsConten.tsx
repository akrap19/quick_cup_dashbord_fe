import { useManageContent } from '@/store/manage-content'

export const ManageRoomsContent = () => {
	const { language } = useManageContent()

	return <>{'Rooms ' + language}</>
}
