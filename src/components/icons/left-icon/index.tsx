import { ComponentProps } from 'react'

import LeftIconAsset from './left-icon.svg'
import { BlockIcon } from '../block-icon'

export const LeftIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={LeftIconAsset} {...props} />
}
