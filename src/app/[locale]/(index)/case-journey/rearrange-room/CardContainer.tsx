import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import type { FC } from 'react'
import { Text } from '@/components/typography/text'
import { useState } from 'react'
import { DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle } from 'react-beautiful-dnd'

import { Card } from './Card'
import { Box } from '@/components/layout/box'
import { cardsData } from './CardData'

const reorder = (list: any, startIndex: number, endIndex: number): any => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const getItemStyle = (
	isDragging: boolean,
	draggableStyle: DraggingStyle | NotDraggingStyle | any | undefined
): React.CSSProperties => ({
	userSelect: 'none',
	// it breaks sometimes, try also with with marginBottom: '1rem'
	marginBottom: '-2.625rem',

	// styles we need to apply on draggables
	...draggableStyle
})

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
	minWidth: '28.375rem'
})

export const CardContainer: FC = () => {
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
				{(provided, snapshot) => (
					<div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
						<Stack gap={4}>
							{cards.map((card, i) => (
								<Inline gap={6} alignItems="center">
									<Text fontWeight="bold" fontSize="small" color="neutral.800">
										{i + 1 + '.'}
									</Text>
									<Box
										borderRadius="small"
										backgroundColor="neutral.150"
										style={{
											minWidth: '26rem',
											height: '2.625rem'
										}}>
										<Draggable key={card.id} draggableId={card.id} index={i}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
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
