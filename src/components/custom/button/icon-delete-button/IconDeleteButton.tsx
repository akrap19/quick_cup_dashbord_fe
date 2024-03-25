import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'
import { iconContainer } from './IconDeleteButton.css'
import React from 'react'

type IconDeleteButtonProps = { onDelete: (file?: string) => void }

export const IconDeleteButton = ({ onDelete }: IconDeleteButtonProps) => {
	return (
		<Button size="auto" variant="adaptive" onClick={() => onDelete()}>
			<div className={iconContainer({ variant: 'trash' })}>
				<TrashIcon size="medium" color="destructive.500" />
			</div>
		</Button>
	)
}
