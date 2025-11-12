import { ComponentProps } from 'react'

import ListBulletsIconAsset from './list-bullets-icon.svg'
import { BlockIcon } from '../block-icon'

export const ListBulletsIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ListBulletsIconAsset} {...props} />
}
