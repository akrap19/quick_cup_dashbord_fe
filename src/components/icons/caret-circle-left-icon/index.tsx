import { ComponentProps } from 'react'

import CaretCircleIconAsset from './caret-left-icon.svg'
import { BlockIcon } from '../block-icon'

export const CaretLeftIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={CaretCircleIconAsset} {...props} />
}
