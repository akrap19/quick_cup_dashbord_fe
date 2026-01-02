'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Product } from 'api/models/products/product'
import { FormTable, FormTableColumn } from '@/components/custom/form-table'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { ProductPrice } from 'api/models/products/productPrice'
import { Box } from '@/components/layout/box'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/inputs/button'
import { Stack } from '@/components/layout/stack'
import { NumericInput } from '@/components/inputs/numeric-input'

interface Props {
	form: UseFormReturn<any>
	isEdit?: boolean
	showProducts: boolean
	setShowProducts: Dispatch<SetStateAction<boolean>>
	cancelDialog?: OpenedProps
	productsPrices: Product[]
}

const ClientForm = ({ form, isEdit, showProducts, setShowProducts, cancelDialog, productsPrices }: Props) => {
	const t = useTranslations()

	const formTableColumns: FormTableColumn<ProductPrice>[] = useMemo(
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
			<FormControl name="companyName">
				<FormControl.Label>
					<RequiredLabel>{t('General.companyName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.companyNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="pin">
				<FormControl.Label>
					<RequiredLabel>{t('General.pin')}</RequiredLabel>
				</FormControl.Label>
				<NumericInput placeholder={t('General.pinPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="firstName">
				<FormControl.Label>
					<RequiredLabel>{t('General.firstNameContactPerson')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.firstNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="lastName">
				<FormControl.Label>
					<RequiredLabel>{t('General.lastNameContactPerson')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.lastNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="email">
				<FormControl.Label>
					<RequiredLabel>{t('General.emailContactPerson')}</RequiredLabel>
				</FormControl.Label>
				<TextInput disabled={isEdit} type="email" placeholder={t('General.emailPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="phoneNumber">
				<FormControl.Label>{t('General.phoneNumberContactPerson')}</FormControl.Label>
				<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="location">
				<FormControl.Label>{t('General.placeAndPostalCode')}</FormControl.Label>
				<TextInput placeholder={t('General.placeAndPostalCodePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="street">
				<FormControl.Label>{t('General.streetAndNumber')}</FormControl.Label>
				<TextInput placeholder={t('General.streetAndNumberPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			{productsPrices && productsPrices.length > 0 && (
				<Box style={{ gridColumn: 'span 2' }}>
					<Stack gap={5}>
						<div>
							<Button
								type="button"
								variant={showProducts ? 'destructive' : 'success'}
								size="small"
								onClick={() => setShowProducts(!showProducts)}>
								{showProducts ? t('General.stopCustomizingProductPrices') : t('General.customizeProductPrices')}
							</Button>
						</div>
						{productsPrices.map((product, index) => {
							const fieldName = `productPrices.${index}.prices`
							form.setValue(`productPrices.${index}.productId`, product.productId)

							return (
								<Box key={product.id} style={{ marginBottom: '1.5rem', display: showProducts ? 'block' : 'none' }}>
									<FormControl name={fieldName}>
										<FormControl.Label>{product.productName}</FormControl.Label>
										<FormTable
											name={fieldName}
											columns={formTableColumns}
											defaultRow={{ minQuantity: undefined, price: undefined }}
											emptyMessage={t('General.noPricesAdded')}
											addButtonLabel={t('General.addRow')}
										/>
										<FormControl.Message />
									</FormControl>
								</Box>
							)
						})}
					</Stack>
				</Box>
			)}
		</FormItems>
	)
}

export default ClientForm
