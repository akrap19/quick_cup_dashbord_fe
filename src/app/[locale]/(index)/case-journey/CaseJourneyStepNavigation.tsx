'use client'

import { useState } from 'react'

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
import { SelectCaseId } from './SelectCaseId'
import { SelectCaseJourneyType } from './SelectCaseJourneyType'
import { SelectTemplate } from './SelectTemplate'
import { SelectTemplateType } from './SelectTemplateType'
import { SelectLanguage } from '../content/add/SelectLanguage'

interface Props {
	caseFiles: Base[]
	languages: Language[]
	content: Content
	templates: Base[]
	template: Content
}

const CaseJourneyStepNavigation = ({ caseFiles, languages, content, templates, template }: Props) => {
	const { currentStep } = useStepsStore()
	const { type } = useCaseJourneyStore()

	const cardsTransformed: CardBase[] = content?.rooms?.map((room: Room) => {
		return {
			id: room.roomId,
			order: room.orderNumber,
			title: room.title
		}
	})
	const [cards, setCards] = useState(cardsTransformed)
	const reorderedRooms = cards
		?.map(shortItem => content?.rooms?.find(longItem => longItem.roomId === shortItem.id))
		?.filter((item): item is Room => item !== undefined)

	const cardsTemplateTransformed: CardBase[] = template?.rooms?.map((room: Room) => {
		return {
			id: room.roomId,
			order: room.orderNumber,
			title: room.title
		}
	})
	const [cardsTemplate, setCardsTemplate] = useState(cardsTemplateTransformed)
	const reorderedTemplateRooms = cards
		?.map(shortItem => template?.rooms?.find(longItem => longItem.roomId === shortItem.id))
		?.filter((item): item is Room => item !== undefined)

	const totalSteps = (() => {
		switch (type) {
			case CaseJourneyTypeEnum.TEMPLATE:
				return 7
			case CaseJourneyTypeEnum.CUSTOM:
				return 9
			case CaseJourneyTypeEnum.CUSTOM_TEMPLATE:
				return 11
			default:
				return 7
		}
	})()

	useSteps({
		totalSteps,
		currentStep: 1
	})
	useNavbarItems({
		title: 'General.caseJourney',
		useUserDropdown: true
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectCaseId caseFiles={caseFiles} />}
			{currentStep === 2 && <SelectLanguage languages={languages} />}
			{currentStep === 3 && <SelectCaseJourneyType />}

			{/* Custom Case Journey */}
			{currentStep === 4 && type === CaseJourneyTypeEnum.CUSTOM && <SelectBarnahusContent abouts={content?.abouts} />}
			{currentStep === 5 && type === CaseJourneyTypeEnum.CUSTOM && <RearrangeRoom cards={cards} setCards={setCards} />}
			{currentStep === 6 && type === CaseJourneyTypeEnum.CUSTOM && <SelectRoomsContent rooms={reorderedRooms} />}
			{currentStep === 7 && type === CaseJourneyTypeEnum.CUSTOM && <SelectStaffContent staffs={content?.staff} />}
			{currentStep === 8 && type === CaseJourneyTypeEnum.CUSTOM && <PreviewAndSave content={content} />}
			{currentStep === 9 && type === CaseJourneyTypeEnum.CUSTOM && <CaseJourneyPublished />}

			{/* Template */}
			{currentStep === 4 && (type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && (
				<SelectTemplate templates={templates} />
			)}
			{currentStep === 5 && (type === CaseJourneyTypeEnum.TEMPLATE || type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE) && (
				<SelectTemplateType />
			)}

			{/* Custom Template */}
			{currentStep === 6 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectBarnahusContent abouts={template?.abouts} />
			)}
			{currentStep === 7 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<RearrangeRoom cards={cardsTemplate} setCards={setCardsTemplate} />
			)}
			{currentStep === 8 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectRoomsContent rooms={reorderedTemplateRooms} />
			)}
			{currentStep === 9 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && (
				<SelectStaffContent staffs={template?.staff} />
			)}
			{currentStep === 10 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && <PreviewAndSave content={template} />}
			{currentStep === 11 && type === CaseJourneyTypeEnum.CUSTOM_TEMPLATE && <CaseJourneyPublished />}

			{/* Ready-made template */}
			{currentStep === 6 && type === CaseJourneyTypeEnum.TEMPLATE && <PreviewAndSave content={template} />}
			{currentStep === 7 && type === CaseJourneyTypeEnum.TEMPLATE && <CaseJourneyPublished />}
		</ManageJourneyWrapper>
	)
}

export default CaseJourneyStepNavigation
