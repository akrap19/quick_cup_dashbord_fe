import { ComponentProps } from 'react'

import LocationIconAsset from './location-icon.svg'
import { BlockIcon } from '../block-icon'

export const LocationIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={LocationIconAsset} {...props} />
}
