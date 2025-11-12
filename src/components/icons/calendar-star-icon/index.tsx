import { ComponentProps } from 'react'

import CalendarStarIconAsset from './calendar-star-icon.svg'
import { BlockIcon } from '../block-icon'

export const CalendarStarIcon = (props: Omit<ComponentProps<typeof BlockIcon>, 'icon'>) => {
	return <BlockIcon icon={CalendarStarIconAsset} {...props} />
}
