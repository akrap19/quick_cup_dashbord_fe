'use client'

import { useEffect } from 'react'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Content } from 'api/models/content/content'
import { Language } from 'api/models/language/language'

import { ManageBarnahusContent } from './ManageBarnahusContent'
import { ManageRoomsContent } from './ManageRoomsContent'
import { ManageStaffContent } from './ManageStaffContent'
import { ContentPublished } from '../common/ContentPublished'
import { PreviewAndPublish } from '../common/PreviewAndPublish'

interface Props {
	language: Language
	languages: Language[]
}

export const ContentStepNavigation = ({ language, languages }: Props) => {
	const { currentStep } = useStepsStore()
	const content: any = localStorage.getItem('content')
	const parsedContent: Content = JSON.parse(content)
	const { setLanguage } = useManageContent()

	useSteps({
		totalSteps: 5,
		currentStep: 1
	})

	useNavbarItems({
		title: 'ManageContent.add',
		backLabel: 'ManageContent.back',
		location: 'Barnahus Stockholm, Sweden'
	})

	useEffect(() => {
		setLanguage({ id: language?.languageId, name: language?.name })
	}, [language])

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <ManageBarnahusContent abouts={parsedContent?.abouts} />}
			{currentStep === 2 && <ManageRoomsContent rooms={parsedContent?.rooms} />}
			{currentStep === 3 && <ManageStaffContent staff={parsedContent?.staff} />}
			{currentStep === 4 && <PreviewAndPublish content={parsedContent} />}
			{currentStep === 5 && <ContentPublished languages={languages} />}
		</ManageJourneyWrapper>
	)
}
