'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useJourneyContentSteps } from '@/hooks/use-journey-content-steps'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useJourneyContentStore } from '@/store/journey-content'

import RearrangeRoom from './rearrange-room/page'
import { SelectBarnahusContent } from './SelectBarnahusContent'
import { SelectCaseId } from './SelectCaseId'
import { SelectRoomsContent } from './SelectRoomsContent'

const AddContentPage = () => {
	const { currentStep } = useJourneyContentStore()
	useJourneyContentSteps({
		totalSteps: 5,
		currentStep: 1
	})
	useNavbarItems({
		title: 'General.caseJourney'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectCaseId />}
			{currentStep === 2 && <RearrangeRoom />}
			{currentStep === 3 && <SelectBarnahusContent />}
			{currentStep === 4 && <SelectRoomsContent />}
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
