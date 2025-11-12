import { ComponentProps } from 'react'

import KeyIconAsset from './key-icon.svg'
import { BlockIcon } from '../block-icon'

export const KeyIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={KeyIconAsset} {...props} />
}
