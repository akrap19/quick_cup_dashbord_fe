'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useJourneyContentSteps } from '@/hooks/use-journey-content-steps'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useJourneyContentStore } from '@/store/journey-content'

import { ManageContent } from './ManageContent'
import { SelectContentType } from './SelectContentType'
import { SelectLanguage } from './SelectLanguage'

const AddContentPage = () => {
	const { currentStep } = useJourneyContentStore()
	useJourneyContentSteps({
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
			{currentStep === 3 && <ManageContent />}
		</ManageJourneyWrapper>
	)
}

export default AddContentPage
