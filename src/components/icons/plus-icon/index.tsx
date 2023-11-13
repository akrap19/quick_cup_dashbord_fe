import { ComponentProps } from 'react'

import PlusIconAsset from './plus-icon.svg'
import { BlockIcon } from '../block-icon'

export const PlusIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={PlusIconAsset} {...props} />
}
