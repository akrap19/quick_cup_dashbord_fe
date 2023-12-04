import { ComponentProps } from 'react'

import UploadIconAsset from './upload-Icon.svg'
import { BlockIcon } from '../block-icon'

export const UploadIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={UploadIconAsset} {...props} />
}
