import { ReactNode, useState } from 'react'
import { getChildByType, removeChildrenByType } from 'react-nanny'

import ChevronIcon from './assets/chevron-up-icon.svg'
import { IconButton } from '../../inputs/icon-button'
import { Text } from '../../typography/text'
import { Box } from '../box'
import { Divider } from '../divider'
import { Stack } from '../stack'

interface Props {
	title?: string
	children: ReactNode
}

export const Card = ({ children, title }: Props) => {
	const [openedDrawer, setOpenedDrawer] = useState(false)

	const extras = getChildByType(children, [Card.Extra])
	const divider = getChildByType(children, [Card.Divider])
	const drawer = getChildByType(children, [Card.Drawer])
	const body = getChildByType(children, [Card.Body])
	const rest = removeChildrenByType(children, [Card.Extra, Card.Divider, Card.Drawer, Card.Body])

	return (
		<Box
			backgroundColor="shades.00"
			borderRadius="small"
			padding={6}
			border="thin"
			borderStyle="solid"
			borderColor="neutral.200">
			<Stack gap={6}>
				{(title || drawer) && (
					<Box display="flex" justifyContent="space-between" alignItems="center">
						{title && <Text fontWeight="semibold">{title}</Text>}
						<Box display="flex" alignItems="center" gap={3}>
							{extras}
							{drawer && (
								<IconButton onClick={() => setOpenedDrawer(prevState => !prevState)} size="small" variant="ghost">
									<ChevronIcon />
								</IconButton>
							)}
						</Box>
					</Box>
				)}
				{divider}
				{body || rest}
				{openedDrawer && drawer}
			</Stack>
		</Box>
	)
}

Card.Extra = ({ children }: { children: ReactNode }) => (
	<Box display="flex" gap={3}>
		{children}
	</Box>
)
Card.Divider = () => <Divider />
Card.Drawer = ({ children }: { children: ReactNode }) => <Stack gap={6}>{children}</Stack>
Card.Body = ({ children }: { children: ReactNode }) => <Stack gap={6}>{children}</Stack>
