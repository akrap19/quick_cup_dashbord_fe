'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'
import { Content } from 'api/models/content/content'
import { Language } from 'api/models/language/language'

import { ManageBarnahusContent } from './ManageBarnahusContent'
import { ManageRoomsContent } from './ManageRoomsContent'
import { ManageStaffContent } from './ManageStaffContent'
import { SelectLanguage } from './SelectLanguage'
import { ContentPublished } from '../common/ContentPublished'
import { PreviewAndPublish } from '../common/PreviewAndPublish'
import { useManageContent } from '@/store/manage-content'

interface Props {
	languages: Language[]
	content: Content
}

export const ContentStepNavigation = ({ languages, content }: Props) => {
	const { currentStep } = useStepsStore()
	const { language } = useManageContent()

	useSteps({
		totalSteps: 6,
		currentStep: language ? 2 : 5
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
			{currentStep === 5 && <PreviewAndPublish content={content} />}
			{currentStep === 6 && <ContentPublished languages={languages} />}
		</ManageJourneyWrapper>
	)
}
