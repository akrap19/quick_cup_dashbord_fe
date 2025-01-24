'use client'

import { useEffect, useState } from 'react'

import {
	RearrangeRoom,
	SelectBarnahusContent,
	SelectRoomsContent,
	SelectStaffContent
} from '@/components/custom/layouts/content-selection'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useCaseJourneyStore } from '@/store/case-journey'
import { useStepsStore } from '@/store/steps'
import { CardBase } from 'api/models/common/cardBase'
import { Content } from 'api/models/content/content'
import { Room } from 'api/models/content/room'
import { Language } from 'api/models/language/language'
import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'

import { CaseJourneyPublished } from './CaseJourneyPublished'
import { PreviewAndSave } from './PreviewAndSave'
import { EnterCustomId } from './EnterCustomId'
import { SelectCaseJourneyType } from './SelectCaseJourneyType'
import { SelectTemplate } from './SelectTemplate'
import { SelectTemplateType } from './SelectTemplateType'
import { SelectLanguage } from '../../content/add/SelectLanguage'
import { EnebleNotes } from './EnebleNotes'
import { SetCasePassword } from './SetCasePassword'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useSearchParams } from 'next/navigation'
import { Templates } from 'api/models/template/templates'

interface Props {
	languages: Language[]
	content: Content
	templates: Templates[]
	template: Content
}

const CaseJourneyStepNavigation = ({ languages, content, templates, template }: Props) => {
	const { currentStep } = useStepsStore()
	const { type } = useCaseJourneyStore()
	const searchParams = useSearchParams()
	const languageId = searchParams.get('languageId')
	const { resetContent } = useManageContentSelection()
	const cardsTransformed: CardBase[] = content?.rooms
		? content?.rooms?.map((room: Room) => {
				return {
					id: room.roomId,
					order: room.orderNumber,
					title: room.title
				}
			})
		: []
	const [cards, setCards] = useState<CardBase[]>(cardsTransformed)
	const reorderedRooms = cards
		?.map(shortItem => content?.rooms?.find(longItem => longItem.roomId === shortItem.id))
		?.filter((item): item is Room => item !== undefined)

	const cardsTemplateTransformed: CardBase[] = template?.rooms
		? template?.rooms?.map((room: Room) => {
				return {
					id: room.roomId,
					order: room.orderNumber,
					title: room.title
				}
			})
		: []
	const [cardsTemplate, setCardsTemplate] = useState(cardsTemplateTransformed)
	const reorderedTemplateRooms = cards
		?.map(shortItem => template?.rooms?.find(longItem => longItem.roomId === shortItem.id))
		?.filter((item): item is Room => item !== undefined)

	const templateStep = (step: number, isGeneralStep: number) => {
		return template?.isGeneral ? isGeneralStep : step
	}

	const totalSteps = (() => {
		switch (type) {
			case CaseJourneyTypeEnum.TEMPLATE:
				return templateStep(9, 8)
			case CaseJourneyTypeEnum.CUSTOM:
				return 11
			case CaseJourneyTypeEnum.CUSTOM_TEMPLATE:
				return templateStep(13, 12)
			default:
				return 8
		}
	})()

	useSteps({
		totalSteps,
		currentStep: 1
	})

	useNavbarItems({
		title: 'CaseJourney.add',
		backLabel: 'CaseJourney.back'
	})

	useEffect(() => {
		resetContent()

		if (JSON.stringify(cardsTransformed) !== JSON.stringify(cards)) {
			setCards(cardsTransformed)
		}

		if (JSON.stringify(cardsTemplateTransformed) !== JSON.stringify(cardsTemplate)) {
			setCardsTemplate(cardsTemplateTransformed)
		}
	}, [languageId])

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <EnterCustomId />}
			{currentStep === 2 && <EnebleNotes />}
			{currentStep === 3 && <SelectLanguage languages={languages} />}
			{currentStep === 4 && <SelectCaseJourneyType />}

			{/* Custom Custom Journey */}
			{currentStep === 5 && type === CaseJourneyTypeEnum.CUSTOM && <SetCasePassword />}
			{currentStep === 6 && type === CaseJourneyTypeEnum.CUSTOM && (
				<SelectBarnahusContent defaultAbouts={content?.abouts} />
			)}
			{currentStep === 7 && type === CaseJourneyTypeEnum.CUSTOM && (
				<RearrangeRoom initialCards={cardsTransformed} cards={cards} setCards={setCards} />
			)}
			{currentStep === 8 && type === CaseJourneyTypeEnum.CUSTOM && <SelectRoomsContent defaultRooms={reorderedRooms} />}
			{currentStep === 9 && type === CaseJourneyTypeEnum.CUSTOM && <SelectStaffContent staffs={content?.staff} />}
			{currentStep === 10 && type === CaseJourneyTypeEnum.CUSTOM && <PreviewAndSave content={content} />}
			{currentStep === 11 && type === CaseJourneyTypeEnum.CUSTOM && <CaseJourneyPublished />}

			{/* Template */}
			{currentStep === 5 && (type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && (
				<SelectTemplate templates={templates} />
			)}
			{!template?.isGeneral &&
				currentStep === 6 &&
				(type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && <SetCasePassword />}
			{currentStep === templateStep(7, 6) &&
				(type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && (
					<SelectTemplateType />
				)}

			{/* Custom Template */}
			{currentStep === templateStep(8, 7) && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectBarnahusContent defaultAbouts={template?.abouts} />
			)}
			{currentStep === templateStep(9, 8) && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<RearrangeRoom initialCards={cardsTemplateTransformed} cards={cardsTemplate} setCards={setCardsTemplate} />
			)}
			{currentStep === templateStep(10, 9) && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectRoomsContent defaultRooms={reorderedTemplateRooms} />
			)}
			{currentStep === templateStep(11, 10) && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectStaffContent staffs={template?.staff} />
			)}
			{currentStep === templateStep(12, 11) && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<PreviewAndSave content={template} />
			)}
			{currentStep === templateStep(13, 12) && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && <CaseJourneyPublished />}

			{/* Ready-made template */}
			{currentStep === templateStep(8, 7) && type === CaseJourneyTypeEnum.TEMPLATE && (
				<PreviewAndSave content={template} />
			)}
			{currentStep === templateStep(9, 8) && type === CaseJourneyTypeEnum.TEMPLATE && <CaseJourneyPublished />}
		</ManageJourneyWrapper>
	)
}

export default CaseJourneyStepNavigation
