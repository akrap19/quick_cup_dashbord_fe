import { ComponentProps } from 'react'

import EuroIconAsset from './euro-icon.svg'
import { BlockIcon } from '../block-icon'

export const EuroIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={EuroIconAsset} {...props} />
}
