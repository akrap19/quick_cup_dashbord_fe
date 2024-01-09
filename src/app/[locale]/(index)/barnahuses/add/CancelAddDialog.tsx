'use client'

import { useTranslations } from 'next-intl'

import { ConfirmDialog } from '@/components/custom/confirm-dialog'
import { Button } from '@/components/inputs/button'

type Props = {
	cancelDialog: {
		opened: boolean
		toggleOpened: () => void
	}
}

export const CancelAddDialog = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<ConfirmDialog opened={cancelDialog.opened} onClose={cancelDialog.toggleOpened}>
			<ConfirmDialog.Title>{t('Barnahuses.cancelAdd')}</ConfirmDialog.Title>
			<ConfirmDialog.Description>
				{t.rich('General.cancelDescription', {
					// eslint-disable-next-line
					important: chunks => <b>{chunks}</b>
				})}
			</ConfirmDialog.Description>
			<ConfirmDialog.Actions>
				<Button variant="secondary" onClick={cancelDialog.toggleOpened}>
					{t('General.cancel')}
				</Button>
				<Button onClick={cancelDialog.toggleOpened}>{t('General.stay')}</Button>
			</ConfirmDialog.Actions>
		</ConfirmDialog>
	)
}
