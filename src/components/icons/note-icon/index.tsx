import { ComponentProps } from 'react'

import NoteIconAsset from './note-icon.svg'
import { BlockIcon } from '../block-icon'

export const NoteIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={NoteIconAsset} {...props} />
}
