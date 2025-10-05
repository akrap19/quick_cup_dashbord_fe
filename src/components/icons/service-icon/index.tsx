import { ComponentProps } from 'react'

import ServiceIconAsset from './service-icon.svg'
import { BlockIcon } from '../block-icon'

export const ServiceIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ServiceIconAsset} {...props} />
}
