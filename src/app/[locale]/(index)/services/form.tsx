'use client'

import { useMemo, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useWatch, useFormContext } from 'react-hook-form'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Textarea } from '@/components/inputs/text-area'
import { Checkbox } from '@/components/inputs/checkbox'
import { OpenedProps } from '@/hooks/use-toggle'
import { Box } from '@/components/layout/box'
import { FormTable, FormTableColumn } from '@/components/custom/form-table'
import { ServicePrice } from 'api/models/services/servicePrice'
import { PriceCalculationUnit } from 'enums/priceCalculationUnit'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingIntervalEnum } from 'enums/billingIntervalEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { formatUnitLabel } from '@/utils/index'
import { Heading } from '@/components/typography/heading'
import { Stack } from '@/components/layout/stack'
import { tokens } from '@/style/theme.css'

interface Props {
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const ServiceForm = ({ isEdit, cancelDialog }: Props) => {
	const t = useTranslations()
	const form = useFormContext()
	const acquisitionType = useWatch({ control: form.control, name: 'acquisitionType' })
	const buyPrices = useWatch({ control: form.control, name: 'buyPrices' }) || []
	const rentPrices = useWatch({ control: form.control, name: 'rentPrices' }) || []

	useEffect(() => {
		if (acquisitionType === AcquisitionTypeEnum.BUY || acquisitionType === 'both') {
			if (buyPrices.length === 0) {
				form.setValue('buyPrices', [{ minQuantity: undefined, maxQuantity: undefined, price: undefined }], {
					shouldValidate: false
				})
			}
		}
	}, [acquisitionType, form, buyPrices.length])

	useEffect(() => {
		if (acquisitionType === AcquisitionTypeEnum.RENT || acquisitionType === 'both') {
			if (rentPrices.length === 0) {
				form.setValue('rentPrices', [{ minQuantity: undefined, maxQuantity: undefined, price: undefined }], {
					shouldValidate: false
				})
			}
		}
	}, [acquisitionType, form, rentPrices.length])

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

	const acquisitionTypeOptions = [
		...Object.values(AcquisitionTypeEnum).map(value => ({
			id: value,
			name: t(`Services.${value}`)
		})),
		{
			id: 'both',
			name: t('Services.both')
		}
	]

	const billingIntervalOptions = Object.values(BillingIntervalEnum).map(value => ({
		id: value,
		name: t(`Services.${value}`)
	}))

	const inputTypeOptions = Object.values(InputTypeEnum).map(value => ({
		id: value,
		name: t(`Services.${value}`)
	}))

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
			<FormControl name="acquisitionType">
				<FormControl.Label>
					<RequiredLabel>{t('Services.acquisitionType')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown options={acquisitionTypeOptions} placeholder={t('Services.acquisitionTypePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="billingInterval">
				<FormControl.Label>
					<RequiredLabel>{t('Services.billingInterval')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown options={billingIntervalOptions} placeholder={t('Services.billingIntervalPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="description" maxLength="500">
				<FormControl.Label>{t('General.description')}</FormControl.Label>
				<Textarea placeholder={t('General.descriptionPlaceholder')} rows={4} />
				<FormControl.Message />
			</FormControl>
			{(acquisitionType === AcquisitionTypeEnum.BUY || acquisitionType === 'both') && (
				<Stack gap={4} style={{ gridColumn: 'span 2' }}>
					<Box style={{ gridColumn: 'span 2' }}>
						<Heading variant="h4">{t('General.buy')}</Heading>
					</Box>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							columnGap: tokens.spacing[6],
							rowGap: tokens.spacing[8]
						}}>
						<FormControl name="inputTypeForBuy">
							<FormControl.Label>{t('Services.inputOrderTime')}</FormControl.Label>
							<SearchDropdown options={inputTypeOptions} placeholder={t('Services.inputTypePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="isDefaultServiceForBuy">
							<FormControl.Label>{t('Services.isDefaultService')}</FormControl.Label>
							<Checkbox label="" style={{ width: 'fit-content' }} />
							<FormControl.Message />
						</FormControl>
						<Box style={{ gridColumn: 'span 2' }}>
							<FormControl name="buyPrices">
								<FormControl.Label>
									<RequiredLabel>{t('General.price')}</RequiredLabel>
								</FormControl.Label>
								<FormTable<ServicePrice>
									name="buyPrices"
									columns={formTableColumns}
									defaultRow={{ minQuantity: undefined, price: undefined }}
									emptyMessage={t('General.noPricesAdded')}
									addButtonLabel={t('General.addRow')}
								/>
								<FormControl.Message />
							</FormControl>
						</Box>
					</div>
				</Stack>
			)}

			{(acquisitionType === AcquisitionTypeEnum.RENT || acquisitionType === 'both') && (
				<Stack gap={4} style={{ gridColumn: 'span 2' }}>
					<Box style={{ gridColumn: 'span 2' }}>
						<Heading variant="h4">{t('General.rent')}</Heading>
					</Box>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							columnGap: tokens.spacing[6],
							rowGap: tokens.spacing[8]
						}}>
						<FormControl name="inputTypeForRent">
							<FormControl.Label>{t('Services.inputOrderTime')}</FormControl.Label>
							<SearchDropdown options={inputTypeOptions} placeholder={t('Services.inputTypePlaceholder')} />
							<FormControl.Message />
						</FormControl>
						<FormControl name="isDefaultServiceForRent">
							<FormControl.Label>{t('Services.isDefaultService')}</FormControl.Label>
							<Checkbox label="" style={{ width: 'fit-content' }} />
							<FormControl.Message />
						</FormControl>
						<Box style={{ gridColumn: 'span 2' }}>
							<FormControl name="rentPrices">
								<FormControl.Label>
									<RequiredLabel>{t('General.price')}</RequiredLabel>
								</FormControl.Label>
								<FormTable<ServicePrice>
									name="rentPrices"
									columns={formTableColumns}
									defaultRow={{ minQuantity: undefined, price: undefined }}
									emptyMessage={t('General.noPricesAdded')}
									addButtonLabel={t('General.addRow')}
								/>
								<FormControl.Message />
							</FormControl>
						</Box>
					</div>
				</Stack>
			)}
		</FormItems>
	)
}

export default ServiceForm
