import { ComponentProps } from 'react'

import PublishIconAsset from './publish-icon.svg'
import { BlockIcon } from '../block-icon'

export const PublishIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={PublishIconAsset} {...props} />
}
