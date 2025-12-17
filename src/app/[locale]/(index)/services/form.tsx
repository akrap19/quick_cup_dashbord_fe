'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Box } from '@/components/layout/box'
import { FormTable, FormTableColumn } from '@/components/custom/form-table'
import { ServicePrice } from 'api/models/services/servicePrice'
import { PriceCalculationUnit } from 'enums/priceCalculationUnit'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { formatUnitLabel } from '@/utils/index'

interface Props {
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const ServiceForm = ({ isEdit, cancelDialog }: Props) => {
	const t = useTranslations()

	const formTableColumns: FormTableColumn<ServicePrice>[] = useMemo(
		() => [
			{
				key: 'minQuantity',
				label: t('General.minQuantity'),
				type: 'number',
				placeholder: '1',
				transform: (val: any) => (val !== undefined && val !== null && val !== '' ? Number(val) : 0)
			},
			{
				key: 'maxQuantity',
				label: t('General.maxQuantity'),
				type: 'number',
				placeholder: '500',
				optional: true,
				transform: (val: any) => (val !== undefined && val !== null && val !== '' ? Number(val) : undefined)
			},
			{
				key: 'price',
				label: t('General.price'),
				type: 'decimal',
				placeholder: t('General.pricePlaceholder'),
				transform: (val: any) => (val !== undefined && val !== null && val !== '' ? Number(val) : 0)
			}
		],
		[t]
	)

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="name">
				<FormControl.Label>
					<RequiredLabel>{t('General.name')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.namePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="priceCalculationUnit">
				<FormControl.Label>
					<RequiredLabel>{t('Services.priceCalculationUnit')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown
					placeholder={t('Services.priceCalculationUnitPlaceholder')}
					options={Object.values(PriceCalculationUnit).map(unit => ({ id: unit, name: formatUnitLabel(unit) }))}
				/>
				<FormControl.Message />
			</FormControl>
			<Box style={{ gridColumn: 'span 2' }}>
				<FormControl name="prices">
					<FormControl.Label>
						<RequiredLabel>{t('General.price')}</RequiredLabel>
					</FormControl.Label>
					<FormTable<ServicePrice>
						name="prices"
						columns={formTableColumns}
						defaultRow={{ minQuantity: undefined, price: undefined }}
						emptyMessage={t('General.noPricesAdded')}
						addButtonLabel={t('General.addRow')}
					/>
					<FormControl.Message />
				</FormControl>
			</Box>
		</FormItems>
	)
}

export default ServiceForm
