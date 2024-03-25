'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'

import { RearrangeRoom } from './RearrangeRoom'
import { SelectBarnahusContent } from './SelectBarnahusContent'
import { SelectRoomsContent } from './SelectRoomsContent'
import { SelectTemplate } from './SelectTemplate'

const TempletesPage = () => {
	const { currentStep } = useStepsStore()
	useSteps({
		totalSteps: 5,
		currentStep: 1
	})
	useNavbarItems({
		title: 'General.templates'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectTemplate />}
			{currentStep === 2 && <RearrangeRoom />}
			{currentStep === 3 && <SelectBarnahusContent />}
			{currentStep === 4 && <SelectRoomsContent />}
		</ManageJourneyWrapper>
	)
}

export default TempletesPage
