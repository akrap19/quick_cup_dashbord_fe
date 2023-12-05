import { ComponentProps } from 'react'

import DragIconAsset from './drag-icon.svg'
import { BlockIcon } from '../block-icon'

export const DragIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={DragIconAsset} {...props} />
}
