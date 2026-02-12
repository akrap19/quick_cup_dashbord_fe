'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { ConfirmDialog } from '@/components/custom/confirm-dialog'
import { Button } from '@/components/inputs/button'

type Props = {
	emailVerificationDialog: {
		opened: boolean
		toggleOpened: () => void
	}
	onSubmit: () => Promise<void>
}

export const EmailVerificationDialog = ({ emailVerificationDialog, onSubmit }: Props) => {
	const t = useTranslations()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async () => {
		setIsSubmitting(true)
		await onSubmit()
		setIsSubmitting(false)
	}

	return (
		<ConfirmDialog opened={emailVerificationDialog.opened} onClose={emailVerificationDialog.toggleOpened}>
			<ConfirmDialog.Title>{`${t('Settings.emailVerificationDialogTitle')}?`}</ConfirmDialog.Title>
			<ConfirmDialog.Description>{t('Settings.emailVerificationDialogDescription')}</ConfirmDialog.Description>
			<ConfirmDialog.Actions>
				<Button variant="secondary" onClick={emailVerificationDialog.toggleOpened} disabled={isSubmitting}>
					{t('General.cancel')}
				</Button>
				<Button onClick={handleSubmit} disabled={isSubmitting}>
					{t(isSubmitting ? 'General.loading' : 'Settings.sendVerification')}
				</Button>
			</ConfirmDialog.Actions>
		</ConfirmDialog>
	)
}
