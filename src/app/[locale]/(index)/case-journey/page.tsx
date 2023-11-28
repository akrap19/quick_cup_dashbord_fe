'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useJourneyContentSteps } from '@/hooks/use-journey-content-steps'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useJourneyContentStore } from '@/store/journey-content'
import RearrangeRoom from './rearrange-room/page'
import { SelectCaseId } from './SelectCaseId'

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
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
