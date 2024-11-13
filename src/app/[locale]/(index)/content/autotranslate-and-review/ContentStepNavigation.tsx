'use client'

import { useEffect, useState } from 'react'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Content } from 'api/models/content/content'
import { Language } from 'api/models/language/language'
import { translateLanguage } from 'api/services/languages'

import { ManageBarnahusContent } from './ManageBarnahusContent'
import { ManageRoomsContent } from './ManageRoomsContent'
import { ManageStaffContent } from './ManageStaffContent'
import { ContentPublished } from '../common/ContentPublished'
import { PreviewAndPublish } from '../common/PreviewAndPublish'
import { Loader } from '@/components/custom/loader/Loader'

interface Props {
	language: Language
	languages: Language[]
}

export const ContentStepNavigation = ({ language, languages }: Props) => {
	const { currentStep } = useStepsStore()
	const [content, setContent] = useState<Content>()
	const { setLanguage } = useManageContent()

	const translateContent = async () => {
		const result = await translateLanguage(language.languageId)
		setContent(result?.data)
	}

	useSteps({
		totalSteps: 5,
		currentStep: 3
	})

	useNavbarItems({
		title: 'ManageContent.add',
		backLabel: 'ManageContent.back'
	})

	useEffect(() => {
		setLanguage({ id: language?.languageId, name: language?.name })
		if (language) {
			translateContent()
		}
	}, [language])

	return (
		<>
			{!content ? (
				<Loader />
			) : (
				<ManageJourneyWrapper>
					{currentStep === 1 && <ManageBarnahusContent abouts={content?.abouts} />}
					{currentStep === 2 && <ManageRoomsContent rooms={content?.rooms} />}
					{currentStep === 3 && <ManageStaffContent staff={content?.staff} />}
					{currentStep === 4 && <PreviewAndPublish content={content} />}
					{currentStep === 5 && <ContentPublished languages={languages} />}
				</ManageJourneyWrapper>
			)}
		</>
	)
}
