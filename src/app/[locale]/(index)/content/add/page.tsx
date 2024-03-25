'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useSteps } from '@/hooks/use-steps'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useStepsStore } from '@/store/steps'
import { useManageContent } from '@/store/manage-content'
import { ContentTypeEnum } from '@/store/models/ContentTypeEnum'

import { ManageBarnahusContent } from './ManageBarnahusContent'
import { ManageRoomsContent } from './ManageRoomsConten'
import { ManageStaffContent } from './ManageStaffContent'
import { SelectContentType } from './SelectContentType'
import { SelectLanguage } from './SelectLanguage'

const AddContentPage = () => {
	const { currentStep } = useStepsStore()
	const { contentType } = useManageContent()
	useSteps({
		totalSteps: 4,
		currentStep: 1
	})
	useNavbarItems({
		title: 'ManageContent.add',
		backLabel: 'ManageContent.back',
		location: 'Barnahus Stockholm, Sweden'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectContentType />}
			{currentStep === 2 && <SelectLanguage />}
			{currentStep === 3 && (
				<>
					{contentType === ContentTypeEnum.Barnahus && <ManageBarnahusContent />}
					{contentType === ContentTypeEnum.Staff && <ManageStaffContent />}
					{contentType === ContentTypeEnum.Rooms && <ManageRoomsContent />}
				</>
			)}
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
