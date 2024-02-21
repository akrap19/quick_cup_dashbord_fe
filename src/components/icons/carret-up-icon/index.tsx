import { ComponentProps } from 'react'

import CarretUpIconAsset from './carret-up-icon.svg'
import { BlockIcon } from '../block-icon'

export const CarretUpIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={CarretUpIconAsset} {...props} />
}
