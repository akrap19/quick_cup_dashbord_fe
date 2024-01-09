import { ComponentProps } from 'react'

import ChevronSelectorIconAsset from './chevron-selector-icon.svg'
import { BlockIcon } from '../block-icon'

export const ChevronSelectorIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ChevronSelectorIconAsset} {...props} />
}
