import { ComponentProps } from 'react'

import InfoIconAsset from './info-icon.svg'
import { BlockIcon } from '../block-icon'

export const InfoIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={InfoIconAsset} {...props} />
}
