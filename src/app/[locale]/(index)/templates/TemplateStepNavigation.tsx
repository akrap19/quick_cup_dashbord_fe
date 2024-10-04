'use client'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'
import { CardBase } from 'api/models/common/cardBase'
import { Content } from 'api/models/content/content'
import { Room } from 'api/models/content/room'
import { useState } from 'react'

import { RearrangeRoom } from './RearrangeRoom'
import { SelectBarnahusContent } from './SelectBarnahusContent'
import { SelectRoomsContent } from './SelectRoomsContent'

interface Props {
	templateData: Content
}

export const TemplateStepNavigation = ({ templateData }: Props) => {
	const { currentStep } = useStepsStore()
	const cardsTransformed: CardBase[] = templateData?.rooms?.map((room: Room) => {
		return {
			id: room.roomId,
			order: room.orderNumber,
			title: room.title
		}
	})
	const [cards, setCards] = useState(cardsTransformed)
	useSteps({
		totalSteps: 5,
		currentStep: 1
	})
	useNavbarItems({
		title: 'General.templates'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <RearrangeRoom cards={cards} setCards={setCards} />}
			{currentStep === 2 && <SelectBarnahusContent abouts={templateData?.abouts} />}
			{currentStep === 3 && <SelectRoomsContent />}
			{currentStep === 4 && <SelectRoomsContent />}
			{currentStep === 5 && <SelectRoomsContent />}
		</ManageJourneyWrapper>
	)
}
