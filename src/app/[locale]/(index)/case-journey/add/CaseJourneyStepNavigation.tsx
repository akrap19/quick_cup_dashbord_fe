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
import { Base } from 'api/models/common/base'
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

interface Props {
	languages: Language[]
	content: Content
	templates: Base[]
	template: Content
}

const CaseJourneyStepNavigation = ({ languages, content, templates, template }: Props) => {
	const { currentStep } = useStepsStore()
	const { type } = useCaseJourneyStore()
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

	const totalSteps = (() => {
		switch (type) {
			case CaseJourneyTypeEnum.TEMPLATE:
				return 8
			case CaseJourneyTypeEnum.CUSTOM:
				return 10
			case CaseJourneyTypeEnum.CUSTOM_TEMPLATE:
				return 12
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
		if (JSON.stringify(cardsTransformed) !== JSON.stringify(cards)) {
			setCards(cardsTransformed)
		}

		if (JSON.stringify(cardsTemplateTransformed) !== JSON.stringify(cardsTemplate)) {
			setCardsTemplate(cardsTemplateTransformed)
		}
	}, [])

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <EnterCustomId />}
			{currentStep === 2 && <EnebleNotes />}
			{currentStep === 3 && <SelectLanguage languages={languages} />}
			{currentStep === 4 && <SelectCaseJourneyType />}

			{/* Custom Custom Journey */}
			{currentStep === 5 && type === CaseJourneyTypeEnum.CUSTOM && <SelectBarnahusContent abouts={content?.abouts} />}
			{currentStep === 6 && type === CaseJourneyTypeEnum.CUSTOM && <RearrangeRoom cards={cards} setCards={setCards} />}
			{currentStep === 7 && type === CaseJourneyTypeEnum.CUSTOM && <SelectRoomsContent rooms={reorderedRooms} />}
			{currentStep === 8 && type === CaseJourneyTypeEnum.CUSTOM && <SelectStaffContent staffs={content?.staff} />}
			{currentStep === 9 && type === CaseJourneyTypeEnum.CUSTOM && <PreviewAndSave content={content} />}
			{currentStep === 10 && type === CaseJourneyTypeEnum.CUSTOM && <CaseJourneyPublished />}

			{/* Template */}
			{currentStep === 5 && (type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && (
				<SelectTemplate templates={templates} />
			)}
			{currentStep === 6 && (type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && (
				<SelectTemplateType />
			)}

			{/* Custom Template */}
			{currentStep === 7 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectBarnahusContent abouts={template?.abouts} />
			)}
			{currentStep === 8 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<RearrangeRoom cards={cardsTemplate} setCards={setCardsTemplate} />
			)}
			{currentStep === 9 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectRoomsContent rooms={reorderedTemplateRooms} />
			)}
			{currentStep === 10 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectStaffContent staffs={template?.staff} />
			)}
			{currentStep === 11 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && <PreviewAndSave content={template} />}
			{currentStep === 12 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && <CaseJourneyPublished />}

			{/* Ready-made template */}
			{currentStep === 7 && type === CaseJourneyTypeEnum.TEMPLATE && <PreviewAndSave content={template} />}
			{currentStep === 8 && type === CaseJourneyTypeEnum.TEMPLATE && <CaseJourneyPublished />}
		</ManageJourneyWrapper>
	)
}

export default CaseJourneyStepNavigation
