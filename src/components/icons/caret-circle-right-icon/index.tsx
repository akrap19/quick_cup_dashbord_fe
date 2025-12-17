import { ComponentProps } from 'react'

import CaretRightIconAsset from './caret-right-icon.svg'
import { BlockIcon } from '../block-icon'

export const CaretRightIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={CaretRightIconAsset} {...props} />
}
