import { ComponentProps } from 'react'

import PauseIconAsset from './pause-icon.svg'
import { BlockIcon } from '../block-icon'

export const PauseIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={PauseIconAsset} {...props} />
}
