import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { card } from './Card.css'
import { Text } from '@/components/typography/text'
import { DragIcon } from '@/components/icons/drag-icon'
import { Inline } from '@/components/layout/inline'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'

interface Props {
	children: ReactNode
}

export const Card = ({ children }: Props) => {
	const t = useTranslations()

	return (
		<div className={card}>
			<Inline gap={2}>
				<DragIcon color="neutral.800" />
				<Text fontWeight="semibold" color="neutral.500" lineHeight="xlarge">
					{t(children)}
				</Text>
			</Inline>
			<Button variant="adaptive" size="auto">
				<TrashIcon color="destructive.500" />
			</Button>
		</div>
	)
}
