'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import * as styles from './Dialog.css'
import { Stack } from '../../layout/stack'
import { Text } from '../../typography/text'

interface Props {
	title: string
	description: string
	opened: boolean
	children: ReactNode
	onClose: () => void
}

export const Dialog = ({ title, description, opened, children, onClose }: Props) => {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<DialogPrimitive.Root open={opened} onOpenChange={onChange}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className={styles.overlay} />
				<DialogPrimitive.DialogContent className={styles.content}>
					<Stack gap={4}>
						<Text variant="h4">{title}</Text>
						<Text>{description}</Text>
						{children}
					</Stack>
				</DialogPrimitive.DialogContent>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}
