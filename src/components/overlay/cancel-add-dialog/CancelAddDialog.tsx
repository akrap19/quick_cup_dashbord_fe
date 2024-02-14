'use client'

import { useTranslations } from 'next-intl'

import { CancelButton } from '@/components/custom/button/cancel-button'
import { ConfirmDialog } from '@/components/custom/confirm-dialog'
import { Button } from '@/components/inputs/button'

type Props = {
	cancelDialog: {
		opened: boolean
		toggleOpened: () => void
	}
	title: string
}

export const CancelAddDialog = ({ title, cancelDialog }: Props) => {
	const t = useTranslations()

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
				<CancelButton />
				<Button onClick={cancelDialog.toggleOpened}>{t('General.stay')}</Button>
			</ConfirmDialog.Actions>
		</ConfirmDialog>
	)
}
