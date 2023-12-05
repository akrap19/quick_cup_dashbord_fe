import { ComponentProps } from 'react'

import PlainPlusIconAsset from './plain-plus-icon.svg'
import { BlockIcon } from '../block-icon'

export const PlainPlusIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={PlainPlusIconAsset} {...props} />
}
