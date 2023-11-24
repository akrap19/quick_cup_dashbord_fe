'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useJourneyContentSteps } from '@/hooks/use-journey-content-steps'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useJourneyContentStore } from '@/store/journey-content'
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
			<SelectCaseId />
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
