'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import * as styles from './Dialog.css'

interface Props {
	opened: boolean
	children: ReactNode
	onClose: () => void
}

export const Dialog = ({ opened, children, onClose }: Props) => {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<DialogPrimitive.Root open={opened} onOpenChange={onChange}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className={styles.overlay} />
				<DialogPrimitive.DialogContent className={styles.content}>{children}</DialogPrimitive.DialogContent>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}
