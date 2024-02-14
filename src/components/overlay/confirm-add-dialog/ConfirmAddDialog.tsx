'use client'

import { useTranslations } from 'next-intl'

import { ConfirmDialog } from '@/components/custom/confirm-dialog'
import { Button } from '@/components/inputs/button'

type Props = {
	title: string
	description: string
	buttonLabel: string
	confirmDialog: {
		opened: boolean
		toggleOpened: () => void
	}
	onSubmit: () => Promise<void>
}

export const ConfirmAddDialog = ({ title, description, buttonLabel, confirmDialog, onSubmit }: Props) => {
	const t = useTranslations()

	return (
		<ConfirmDialog opened={confirmDialog.opened} onClose={confirmDialog.toggleOpened}>
			<ConfirmDialog.Title>{`${t(title)}?`}</ConfirmDialog.Title>
			<ConfirmDialog.Description>
				{t.rich(description, {
					// eslint-disable-next-line
					important: chunks => <b>{chunks}</b>
				})}
			</ConfirmDialog.Description>
			<ConfirmDialog.Actions>
				<Button variant="secondary" onClick={confirmDialog.toggleOpened}>
					{t('General.cancel')}
				</Button>
				<Button onClick={() => onSubmit()}>{t(buttonLabel)}</Button>
			</ConfirmDialog.Actions>
		</ConfirmDialog>
	)
}
