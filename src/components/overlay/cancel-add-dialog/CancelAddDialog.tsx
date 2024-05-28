'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { CancelButton } from '@/components/custom/button/cancel-button'
import { ConfirmDialog } from '@/components/custom/confirm-dialog'
import { Button } from '@/components/inputs/button'
import { OpenedProps } from '@/hooks/use-toggle'

type Props = {
	title: string
	values: any
	cancelDialog: OpenedProps
}

export const CancelAddDialog = ({ title, values, cancelDialog }: Props) => {
	const t = useTranslations()
	const { back } = useRouter()
	const isSomeValueNotEmpty = Object.values(values).some(value => {
		switch (typeof value) {
			case 'boolean':
				return value === false
			case 'string':
				return value !== ''
			default:
				return value !== undefined
		}
	})

	useEffect(() => {
		if (cancelDialog.opened && !isSomeValueNotEmpty) {
			cancelDialog.toggleOpened()
			back()
		}
	}, [cancelDialog.opened])

	return (
		<ConfirmDialog opened={cancelDialog.opened} onClose={cancelDialog.toggleOpened}>
			<ConfirmDialog.Title>{t(title)}</ConfirmDialog.Title>
			<ConfirmDialog.Description>
				{t.rich('General.cancelDescription', {
					// eslint-disable-next-line
					important: chunks => <b>{chunks}</b>
				})}
			</ConfirmDialog.Description>
			<ConfirmDialog.Actions>
				<CancelButton size="medium" />
				<Button onClick={cancelDialog.toggleOpened} size="medium">
					{t('General.stay')}
				</Button>
			</ConfirmDialog.Actions>
		</ConfirmDialog>
	)
}
