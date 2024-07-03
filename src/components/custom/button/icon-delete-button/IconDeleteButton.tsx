import React from 'react'

import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'

import { iconContainer } from './IconDeleteButton.css'

type IconDeleteButtonProps = { onDelete: (file?: string) => void }

export const IconDeleteButton = ({ onDelete }: IconDeleteButtonProps) => {
	return (
		<Button type="button" size="auto" variant="adaptive" onClick={() => onDelete()}>
			<div className={iconContainer({ variant: 'trash' })}>
				<TrashIcon size="medium" color="destructive.500" />
			</div>
		</Button>
	)
}
