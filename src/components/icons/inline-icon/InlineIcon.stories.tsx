import { Stack } from 'components/layout/stack/Stack'
import { Heading } from 'components/typography/heading/Heading'

import CalendarIconAsset from './assets/vacation-inline-icon.svg'
import { InlineIcon } from './InlineIcon'

export default {
	title: 'UI/Icons/InlineIcon',
	component: InlineIcon
}

export const Sizes = () => {
	return (
		<Stack gap={10}>
			<Heading variant="h1">
				<InlineIcon icon={CalendarIconAsset} /> Heading level 1
			</Heading>
			<Heading variant="h2">
				<InlineIcon icon={CalendarIconAsset} /> Heading level 2
			</Heading>
			<Heading variant="h3">
				<InlineIcon icon={CalendarIconAsset} /> Heading level 3
			</Heading>
			<Heading variant="h4">
				<InlineIcon icon={CalendarIconAsset} /> Heading level 4
			</Heading>
		</Stack>
	)
}
