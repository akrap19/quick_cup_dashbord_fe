import { ComponentProps } from 'react'

import ChevronSelectorUpIconAsset from './chevron-selector-up-icon.svg'
import { BlockIcon } from '../block-icon'

export const ChevronSelectorUpIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ChevronSelectorUpIconAsset} {...props} />
}
