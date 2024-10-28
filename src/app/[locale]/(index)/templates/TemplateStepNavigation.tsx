'use client'

import { useState } from 'react'

import {
	RearrangeRoom,
	SelectBarnahusContent,
	SelectRoomsContent,
	SelectStaffContent
} from '@/components/custom/layouts/content-selection'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useStepsStore } from '@/store/steps'
import { CardBase } from 'api/models/common/cardBase'
import { Content } from 'api/models/content/content'
import { Room } from 'api/models/content/room'
import { ROUTES } from 'parameters'

import { EnterTemplateName } from './EnterTemplateName'
import { PreviewAndSave } from './PreviewAndSave'
import { TemplatePublished } from './TemplatePublished'

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
	const reorderedRooms = cards
		?.map(shortItem => templateData?.rooms?.find(longItem => longItem.roomId === shortItem.id))
		?.filter((item): item is Room => item !== undefined) // Type guard to ensure only Room elements

	useSteps({
		totalSteps: 7,
		currentStep: 1
	})
	useNavbarItems({
		title: 'General.templates',
		useUserDropdown: true
	})

	console.log('templateData', templateData)
	return (
		<ManageJourneyWrapper>
			{currentStep === 1 &&
				(templateData?.abouts?.length > 0 ? (
					<EnterTemplateName />
				) : (
					<ManageJourneyIntroWrapper>
						<NoListData
							title="Templates.noContentPublishedTitle"
							description="Templates.noContentPublishedDescription"
							setNavbarItems={false}
							buttonLabel="ManageContent.add"
							buttonLink={ROUTES.ADD_CONTENT}
							distanceFromTop="0px"
						/>
					</ManageJourneyIntroWrapper>
				))}
			{currentStep === 2 && <SelectBarnahusContent abouts={templateData?.abouts} />}
			{currentStep === 3 && <RearrangeRoom cards={cards} setCards={setCards} />}
			{currentStep === 4 && <SelectRoomsContent rooms={reorderedRooms} />}
			{currentStep === 5 && <SelectStaffContent staffs={templateData?.staff} />}
			{currentStep === 6 && <PreviewAndSave templateData={templateData} />}
			{currentStep === 7 && <TemplatePublished />}
		</ManageJourneyWrapper>
	)
}
