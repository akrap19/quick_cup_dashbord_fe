import { ComponentProps } from 'react'

import BarcodeIconAsset from './barcode-icon.svg'
import { BlockIcon } from '../block-icon'

export const BarcodeIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={BarcodeIconAsset} {...props} />
}
