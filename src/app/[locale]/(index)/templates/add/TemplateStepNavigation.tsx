'use client'

import { useEffect, useState } from 'react'

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
import { IsTemplateGeneral } from './IsTemplateGeneral'
import { useManageContentSelection } from '@/store/manage-content-selection'

interface Props {
	templateData: Content
}

export const TemplateStepNavigation = ({ templateData }: Props) => {
	const { currentStep } = useStepsStore()
	const { resetContent } = useManageContentSelection()
	const cardsTransformed: CardBase[] = templateData?.rooms
		? templateData?.rooms?.map((room: Room) => {
				return {
					id: room.roomId,
					order: room.orderNumber,
					title: room.title
				}
			})
		: []
	const [cards, setCards] = useState(cardsTransformed)
	const reorderedRooms = cards
		?.map(shortItem => templateData?.rooms?.find(longItem => longItem.roomId === shortItem.id))
		?.filter((item): item is Room => item !== undefined)

	useSteps({
		totalSteps: 8,
		currentStep: 1
	})

	useNavbarItems({
		title: 'Templates.add',
		backLabel: 'Templates.back'
	})

	useEffect(() => {
		resetContent()
	}, [])

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 &&
				(templateData?.abouts && templateData?.abouts?.length > 0 ? (
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
			{currentStep === 2 && <IsTemplateGeneral />}
			{currentStep === 3 && <SelectBarnahusContent defaultAbouts={templateData?.abouts} />}
			{currentStep === 4 && <RearrangeRoom initialCards={cardsTransformed} cards={cards} setCards={setCards} />}
			{currentStep === 5 && <SelectRoomsContent defaultRooms={reorderedRooms} />}
			{currentStep === 6 && <SelectStaffContent staffs={templateData?.staff} />}
			{currentStep === 7 && <PreviewAndSave templateData={templateData} />}
			{currentStep === 8 && <TemplatePublished />}
		</ManageJourneyWrapper>
	)
}
