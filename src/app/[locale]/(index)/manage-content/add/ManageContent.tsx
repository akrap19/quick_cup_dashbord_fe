import { useManageContent } from '@/store/manage-content'

export const ManageContent = () => {
	const { contentType, language } = useManageContent()

	return (
		<>
			{contentType}
			<br />
			{language}
		</>
	)
}
