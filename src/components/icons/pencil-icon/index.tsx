import { ComponentProps } from 'react'

import PencilIconAsset from './pencil-icon.svg'
import { BlockIcon } from '../block-icon'

export const PencilIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={PencilIconAsset} {...props} />
}
