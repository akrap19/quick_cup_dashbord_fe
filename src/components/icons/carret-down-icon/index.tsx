import { ComponentProps } from 'react'

import CarretDownIconAsset from './carret-down-icon.svg'
import { BlockIcon } from '../block-icon'

export const CarretDownIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={CarretDownIconAsset} {...props} />
}
