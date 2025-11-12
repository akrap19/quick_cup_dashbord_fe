import { ComponentProps } from 'react'

import HomeIconAsset from './home-icon.svg'
import { BlockIcon } from '../block-icon'

export const HomeIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={HomeIconAsset} {...props} />
}
