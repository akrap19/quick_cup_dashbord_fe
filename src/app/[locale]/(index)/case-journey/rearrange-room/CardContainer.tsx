'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { DragDropContext, Draggable, DraggingStyle, DropResult, Droppable, NotDraggingStyle } from 'react-beautiful-dnd'

import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

import { Card } from './Card'
import { cardsData } from './CardData'

const reorder = (list: any, startIndex: number, endIndex: number): any => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | any | undefined): CSSProperties => ({
	userSelect: 'none',
	// it breaks sometimes, try also with with marginBottom: '1rem'
	marginBottom: '-2.625rem',

	// styles we need to apply on draggables
	...draggableStyle
})

export const CardContainer = () => {
	const [cards, setCards] = useState(cardsData)

	const onDragEnd = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) {
			return
		}

		const items = reorder(cards, source.index, destination.index)

		setCards(items)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{
							minWidth: '28.375rem'
						}}>
						<Stack gap={4}>
							{cards.map((card, i) => (
								<Inline gap={6} alignItems="center">
									<Text fontWeight="bold" fontSize="small" color="neutral.800">
										{`${i + 1}.`}
									</Text>
									<Box
										borderRadius="small"
										backgroundColor="neutral.150"
										style={{
											minWidth: '26rem',
											height: '2.625rem'
										}}>
										<Draggable key={card.id} draggableId={card.id} index={i}>
											{provided => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(provided.draggableProps.style)}>
													<Card>{card.text}</Card>
												</div>
											)}
										</Draggable>
									</Box>
								</Inline>
							))}
						</Stack>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}
