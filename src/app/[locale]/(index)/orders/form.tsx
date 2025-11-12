'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	cancelDialog?: OpenedProps
}

const OrderForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="orderNumber">
				<FormControl.Label>
					<RequiredLabel>{t('Orders.orderNumber')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Orders.orderNumberPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="customerName">
				<FormControl.Label>
					<RequiredLabel>{t('Orders.customerName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Orders.customerNamePlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="status">
				<FormControl.Label>
					<RequiredLabel>{t('General.status')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.statusPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="totalAmount">
				<FormControl.Label>
					<RequiredLabel>{t('Orders.totalAmount')}</RequiredLabel>
				</FormControl.Label>
				<TextInput
					type="number"
					inputMode="decimal"
					min="0"
					step="0.01"
					placeholder={t('Orders.totalAmountPlaceholder')}
				/>
				<FormControl.Message />
			</FormControl>
			<FormControl name="notes" maxLength="500">
				<FormControl.Label>{t('General.notes')}</FormControl.Label>
				<Textarea placeholder={t('Orders.notesPlaceholder')} rows={4} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default OrderForm
