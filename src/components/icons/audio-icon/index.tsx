import { ComponentProps } from 'react'

import AudioIconAsset from './audio-icon.svg'
import { BlockIcon } from '../block-icon'

export const AudioIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={AudioIconAsset} {...props} />
}
