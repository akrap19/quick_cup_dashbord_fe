import { ReactNode } from 'react'
import { getChildByType } from 'react-nanny'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Dialog } from '@/components/overlay/dialog'
import { Text } from '@/components/typography/text'
import { useMounted } from '@/hooks/use-mounted'

interface Props {
	opened: boolean
	children: ReactNode
	onClose: () => void
}

export const ConfirmDialog = ({ opened, children, onClose }: Props) => {
	const mounted = useMounted()

	if (!mounted) return null

	const title = getChildByType(children, [ConfirmDialog.Title])
	const description = getChildByType(children, [ConfirmDialog.Description])
	const actions = getChildByType(children, [ConfirmDialog.Actions])
	const body = getChildByType(children, [ConfirmDialog.Body])

	return (
		<Dialog opened={opened} onClose={onClose}>
			<Stack gap={6}>
				<Stack gap={2}>
					{title}
					{description}
				</Stack>
				{body}
				{actions}
			</Stack>
		</Dialog>
	)
}

ConfirmDialog.Title = ({ children }: { children: ReactNode }) => (
	<Text variant="h4" color="neutral.900">
		{children}
	</Text>
)

ConfirmDialog.Description = ({ children }: { children: ReactNode }) => (
	<Text color="neutral.500" fontSize="small">
		{children}
	</Text>
)

ConfirmDialog.Actions = ({ children }: { children: ReactNode }) => (
	<Box display="flex" justify="flex-end" gap={4}>
		{children}
	</Box>
)

// eslint-disable-next-line react/jsx-no-useless-fragment
ConfirmDialog.Body = ({ children }: { children: ReactNode }) => <>{children}</>
