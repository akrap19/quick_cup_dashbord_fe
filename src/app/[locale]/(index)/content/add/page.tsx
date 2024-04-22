'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'

import { ContentPublished } from './ContentPublished'
import { ManageBarnahusContent } from './manageBarnahusContent/ManageBarnahusContent'
import { ManageRoomsContent } from './ManageRoomsContent'
import { ManageStaffContent } from './manageStaffContent/ManageStaffContent'
import { PreviewAndPublish } from './PreviewAndPublish'
import { SelectLanguage } from './SelectLanguage'

const AddContentPage = () => {
	const { currentStep } = useStepsStore()
	useSteps({
		totalSteps: 6,
		currentStep: 5
	})
	useNavbarItems({
		title: 'ManageContent.add',
		backLabel: 'ManageContent.back',
		location: 'Barnahus Stockholm, Sweden'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectLanguage />}
			{currentStep === 2 && <ManageBarnahusContent />}
			{currentStep === 3 && <ManageRoomsContent />}
			{currentStep === 4 && <ManageStaffContent />}
			{currentStep === 5 && <PreviewAndPublish />}
			{currentStep === 6 && <ContentPublished />}
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
