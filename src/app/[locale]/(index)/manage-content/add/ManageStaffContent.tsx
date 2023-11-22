import { useManageContent } from '@/store/manage-content'

export const ManageStaffContent = () => {
	const { language } = useManageContent()

	return <>{'Staff ' + language}</>
}
