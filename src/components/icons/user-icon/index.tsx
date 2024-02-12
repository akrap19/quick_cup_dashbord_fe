import { ComponentProps } from 'react'

import UserIconAsset from './user-icon.svg'
import { BlockIcon } from '../block-icon'

export const UserIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={UserIconAsset} {...props} />
}
