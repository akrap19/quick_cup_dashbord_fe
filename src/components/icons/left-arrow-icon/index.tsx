import { ComponentProps } from 'react'

import LeftArrowIconAsset from './left-arrow-icon.svg'
import { BlockIcon } from '../block-icon'

export const LeftArrowIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={LeftArrowIconAsset} {...props} />
}
