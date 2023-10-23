import { Inline } from 'components/layout/inline/Inline'

import CalendarIconAsset from './assets/calendar-icon.svg'
import { BlockIcon } from './BlockIcon'

export default {
	title: 'UI/Icons/BlockIcon',
	component: BlockIcon
}

export const CalendarIcon = () => <BlockIcon icon={CalendarIconAsset} size="medium" />

export const Sizes = () => {
	return (
		<Inline gap={4}>
			<BlockIcon icon={CalendarIconAsset} size="small" />
			<BlockIcon icon={CalendarIconAsset} size="medium" />
			<BlockIcon icon={CalendarIconAsset} size="large" />
		</Inline>
	)
}

export const Colors = () => {
	return (
		<Inline gap={4}>
			<div style={{ color: 'red' }}>
				<BlockIcon icon={CalendarIconAsset} />
			</div>
			<div style={{ color: 'green' }}>
				<BlockIcon icon={CalendarIconAsset} />
			</div>
			<div style={{ color: 'blue' }}>
				<BlockIcon icon={CalendarIconAsset} />
			</div>
		</Inline>
	)
}
