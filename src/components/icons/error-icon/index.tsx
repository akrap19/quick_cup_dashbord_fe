import { ComponentProps } from 'react'

import ErrorIconAsset from './error-icon.svg'
import { BlockIcon } from '../block-icon'

export const ErrorIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={ErrorIconAsset} {...props} />
}
