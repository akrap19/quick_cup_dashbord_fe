import { ReactNode } from 'react'
import { getChildByType } from 'react-nanny'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Dialog } from '@/components/overlay/dialog'
import { Text } from '@/components/typography/text'
import { useMounted } from '@/hooks/use-mounted'

interface Props {
	opened: boolean
	title: string
	description: string
	children: ReactNode
	onClose: () => void
}

export const ConfirmDialog = ({ opened, title, description, children, onClose }: Props) => {
	const mounted = useMounted()

	if (!mounted) return null

	const actions = getChildByType(children, [ConfirmDialog.Actions])
	const body = getChildByType(children, [ConfirmDialog.Body])

	return (
		<Dialog opened={opened} onClose={onClose}>
			<Stack gap={6}>
				<Stack gap={2}>
					<Text variant="h4" color="neutral.900">
						{title}
					</Text>
					<Text color="neutral.500">{description}</Text>
				</Stack>
				{body}
				{actions}
			</Stack>
		</Dialog>
	)
}

ConfirmDialog.Actions = ({ children }: { children: ReactNode }) => (
	<Box display="flex" justify="flex-end" gap={4}>
		{children}
	</Box>
)

// eslint-disable-next-line react/jsx-no-useless-fragment
ConfirmDialog.Body = ({ children }: { children: ReactNode }) => <>{children}</>
