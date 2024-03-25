import { ComponentProps } from 'react'

import PlayIconAsset from './play-icon.svg'
import { BlockIcon } from '../block-icon'

export const PlayIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={PlayIconAsset} {...props} />
}
