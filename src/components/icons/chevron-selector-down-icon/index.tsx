import { ComponentProps } from 'react'

import ChevronSelectorDownIconAsset from './chevron-selector-down-icon.svg'
import { BlockIcon } from '../block-icon'

export const ChevronSelectorDownIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ChevronSelectorDownIconAsset} {...props} />
}
