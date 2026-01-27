import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { DragIcon } from '@/components/icons/drag-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'

import { card } from './Card.css'

interface Props {
	id: string
	children: ReactNode
	disableDelete: boolean
	handleRemoveItem: (id: string) => void
}

export const Card = ({ id, children, disableDelete, handleRemoveItem }: Props) => {
	const t = useTranslations()


	return (
		<div className={card}>
			<Inline gap={2}>
				<DragIcon color="neutral.800" />
				<Text fontWeight="semibold" color="neutral.500" lineHeight="xlarge">
					{t(children)}
				</Text>
			</Inline>
			<Button
				type="button"
				variant="adaptive"
				size="auto"
				disabled={disableDelete}
				onClick={() => handleRemoveItem(id)}>
				<TrashIcon color="destructive.500" />
			</Button>
		</div>
	)
}
