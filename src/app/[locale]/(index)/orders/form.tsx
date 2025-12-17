'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { OpenedProps } from '@/hooks/use-toggle'
import { Base } from 'api/models/common/base'
import { Product } from 'api/models/products/product'
import { Divider } from '@/components/layout/divider'
import { Box } from '@/components/layout/box'
import { OrderProductCard } from '@/components/custom/order-product-card/OrderProductCard'

interface Props {
	cancelDialog?: OpenedProps
	customers: Base[]
	events: Base[]
	products: Product[]
}

export const OrderForm = ({ cancelDialog, customers, events, products }: Props) => {
	const t = useTranslations()
	const form = useFormContext()
	const customerId = form.watch('customerId')
	const totalAmount = form.watch('totalAmount') === 0 ? 0 : form.watch('totalAmount')?.toFixed(3)
	const totalAmountLabel = t('Orders.totalAmount') + ': ' + totalAmount + '€'

	return (
		<FormItems summary={totalAmountLabel} openCancelDialog={cancelDialog?.toggleOpened}>
			{products?.map((product: Product, index: number) => (
				<OrderProductCard key={product.id} product={product} index={index} />
			))}
			<Box style={{ gridColumn: 'span 2' }}>
				<Divider />
			</Box>
			<FormControl name="customerId">
				<FormControl.Label>
					<RequiredLabel>{t('General.client')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown options={customers} placeholder={t('General.client')} alwaysShowSearch={true} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="eventId">
				<FormControl.Label>{t('General.event')}</FormControl.Label>
				<SearchDropdown
					options={events}
					placeholder={t('General.event')}
					disabled={!customerId}
					alwaysShowSearch={true}
				/>
				<FormControl.Message />
			</FormControl>
			<FormControl name="location">
				<FormControl.Label>{t('General.location')}</FormControl.Label>
				<TextInput placeholder={t('General.locationPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="place">
				<FormControl.Label>
					<RequiredLabel>{t('General.placeAndPostalCode')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.placeAndPostalCodePlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="street">
				<FormControl.Label>
					<RequiredLabel>{t('General.streetAndNumber')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.streetAndNumberPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<div />
			<FormControl name="contactPerson">
				<FormControl.Label>{t('Orders.contactPerson')}</FormControl.Label>
				<TextInput placeholder={t('Orders.contactPersonPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="contactPersonContact">
				<FormControl.Label>{t('Orders.contactPersonContact')}</FormControl.Label>
				<TextInput placeholder={t('Orders.contactPersonContactPlaceholder')} autoComplete="off" />
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
