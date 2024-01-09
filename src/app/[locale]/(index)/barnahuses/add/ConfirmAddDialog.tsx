'use client'

import { useTranslations } from 'next-intl'

import { ConfirmDialog } from '@/components/custom/confirm-dialog'
import { Button } from '@/components/inputs/button'

type Props = {
	confirmDialog: {
		opened: boolean
		toggleOpened: () => void
	}
}

export const ConfirmAddDialog = ({ confirmDialog }: Props) => {
	const t = useTranslations()

	return (
		<ConfirmDialog opened={confirmDialog.opened} onClose={confirmDialog.toggleOpened}>
			<ConfirmDialog.Title>{`${t('Barnahuses.add')}?`}</ConfirmDialog.Title>
			<ConfirmDialog.Description>{t('Barnahuses.addBarnahusDescription')}</ConfirmDialog.Description>
			<ConfirmDialog.Actions>
				<Button variant="secondary" onClick={confirmDialog.toggleOpened}>
					{t('General.cancel')}
				</Button>
				<Button onClick={() => {}}>{t('Barnahuses.save&Add')}</Button>
			</ConfirmDialog.Actions>
		</ConfirmDialog>
	)
}
