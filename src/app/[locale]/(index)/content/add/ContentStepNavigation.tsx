'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'

import { ManageRoomsContent } from './ManageRoomsContent'
import { ManageStaffContent } from './ManageStaffContent'
import { ContentPublished } from '../common/ContentPublished'
import { PreviewAndPublish } from '../common/PreviewAndPublish'
import { ManageBarnahusContent } from './ManageBarnahusContent'
import { SelectLanguage } from './SelectLanguage'
import { Base } from 'api/models/common/base'

interface Props {
	languages: Base[]
}

export const ContentStepNavigation = ({ languages }: Props) => {
	const { currentStep } = useStepsStore()
	useSteps({
		totalSteps: 6,
		currentStep: 1
	})
	useNavbarItems({
		title: 'ManageContent.add',
		backLabel: 'ManageContent.back',
		location: 'Barnahus Stockholm, Sweden'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectLanguage languages={languages} />}
			{currentStep === 2 && <ManageBarnahusContent />}
			{currentStep === 3 && <ManageRoomsContent />}
			{currentStep === 4 && <ManageStaffContent />}
			{currentStep === 5 && <PreviewAndPublish />}
			{currentStep === 6 && <ContentPublished />}
		</ManageJourneyWrapper>
	)
}
