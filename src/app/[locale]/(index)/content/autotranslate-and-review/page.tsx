'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'

import { ManageBarnahusContent } from './ManageBarnahusContent'
import { ManageRoomsContent } from './ManageRoomsContent'
import { ManageStaffContent } from './ManageStaffContent'
import { ContentPublished } from '../common/ContentPublished'
import { PreviewAndPublish } from '../common/PreviewAndPublish'

const AddContentPage = () => {
	const { currentStep } = useStepsStore()

	useSteps({
		totalSteps: 5,
		currentStep: 1
	})

	useNavbarItems({
		title: 'ManageContent.add',
		backLabel: 'ManageContent.back',
		location: 'Barnahus Stockholm, Sweden'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <ManageBarnahusContent />}
			{currentStep === 2 && <ManageRoomsContent />}
			{currentStep === 3 && <ManageStaffContent />}
			{currentStep === 4 && <PreviewAndPublish />}
			{currentStep === 5 && <ContentPublished />}
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
