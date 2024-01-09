import { ComponentProps } from 'react'

import MinusIconAsset from './minus-icon.svg'
import { BlockIcon } from '../block-icon'

export const MinusIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={MinusIconAsset} {...props} />
}
