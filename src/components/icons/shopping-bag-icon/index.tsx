import { ComponentProps } from 'react'

import ShoppingBagIconAsset from './shopping-bag-icon.svg'
import { BlockIcon } from '../block-icon'

export const ShoppingBagIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ShoppingBagIconAsset} {...props} />
}
