import { ComponentProps } from 'react'

import CheckIconAsset from './check-icon.svg'
import { BlockIcon } from '../block-icon'

export const CheckIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={CheckIconAsset} {...props} />
}
