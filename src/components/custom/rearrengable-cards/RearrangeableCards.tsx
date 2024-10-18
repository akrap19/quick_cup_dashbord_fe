'use client'

import { CSSProperties, Dispatch, SetStateAction } from 'react'
import { DragDropContext, Draggable, DraggingStyle, DropResult, Droppable, NotDraggingStyle } from 'react-beautiful-dnd'

import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { CardBase } from 'api/models/common/cardBase'
import { tokens } from 'style/theme.css'

import { Card } from './Card'

interface Props {
	cards: CardBase[]
	setCards: Dispatch<SetStateAction<CardBase[]>>
}

const reorder = (list: any, startIndex: number, endIndex: number): any => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

export const RearrangeableCards = ({ cards, setCards }: Props) => {
	const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | any | undefined): CSSProperties => ({
		userSelect: 'none',
		padding: tokens.spacing[2],

		...draggableStyle
	})

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (!destination) {
			return
		}

		const items = reorder(cards, source.index, destination.index)

		setCards(items)
	}

	const handleRemoveItem = (id: string) => {
		const newCards = cards?.filter(card => card.id !== id)

		setCards(newCards)
	}

	return (
		<Box
			position="relative"
			style={{
				minWidth: '28.375rem'
			}}>
			<Stack gap={4}>
				{cards?.map((card, i) => (
					<Inline gap={6} alignItems="center">
						<Box style={{ width: '8px' }}>
							<Text fontWeight="bold" fontSize="small" color="neutral.800">
								{`${i + 1}.`}
							</Text>
						</Box>
						<Box
							borderRadius="small"
							backgroundColor="neutral.150"
							style={{
								minWidth: '26rem',
								height: '2.625rem'
							}}
						/>
					</Inline>
				))}
			</Stack>
			<Box position="absolute" style={{ top: '-8px', marginLeft: '1.5rem' }}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppable">
						{provided => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{cards?.map((card, i) => (
									<Draggable key={card.id} draggableId={card.order.toString()} index={i}>
										{provided => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(provided.draggableProps.style)}>
												<Card id={card.id} handleRemoveItem={handleRemoveItem}>
													{card.title}
												</Card>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Box>
		</Box>
	)
}
