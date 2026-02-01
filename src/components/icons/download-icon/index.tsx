import { ComponentProps } from 'react'

import DownloadIconAsset from './download-icon.svg'
import { BlockIcon } from '../block-icon'

export const DownloadIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={DownloadIconAsset} {...props} />
}
