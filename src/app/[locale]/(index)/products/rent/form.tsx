'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { NumericInput } from '@/components/inputs/numeric-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { RichTextEditor } from '@/components/inputs/rich-text-editor'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormTable, FormTableColumn } from '@/components/custom/form-table'
import { ProductPrice } from 'api/models/products/productPrice'
import { ServicePrice } from 'api/models/services/servicePrice'
import { Service } from 'api/models/services/service'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/inputs/button'
import { ProductStateFormTable } from '@/components/custom/product-state-form-table/ProductStateFormTable'
import { Base } from 'api/models/common/base'

interface Props {
	cancelDialog?: OpenedProps
	initialImageUrls?: string[]
	isEdit?: boolean
	showServices: boolean
	setShowServices: Dispatch<SetStateAction<boolean>>
	servicesPrices: Service[]
	form: UseFormReturn<any>
	users: Base[]
	serviceLocations: Base[]
}

const RentForm = ({
	cancelDialog,
	initialImageUrls,
	isEdit,
	showServices,
	setShowServices,
	servicesPrices,
	form,
	users,
	serviceLocations
}: Props) => {
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

	const servicePriceFormTableColumns: FormTableColumn<ServicePrice>[] = useMemo(
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
			<div />
			<FormControl name="unit">
				<FormControl.Label>
					<RequiredLabel>{t('General.unit')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.unitPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="quantityPerUnit">
				<FormControl.Label>
					<RequiredLabel>{t('General.quantityPerUnit')}</RequiredLabel>
				</FormControl.Label>
				<NumericInput placeholder={t('General.quantityPerUnitPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="transportationUnit">
				<FormControl.Label>
					<RequiredLabel>{t('General.transportationUnit')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.transportationUnitPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="unitsPerTransportationUnit">
				<FormControl.Label>
					<RequiredLabel>{t('General.unitsPerTransportationUnit')}</RequiredLabel>
				</FormControl.Label>
				<NumericInput placeholder={t('General.unitsPerTransportationUnitPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<Stack gap={8} style={{ gridColumn: 'span 2', maxWidth: '520px' }}>
				<FormControl name="description">
					<FormControl.Label>{t('General.description')}</FormControl.Label>
					<RichTextEditor placeholder={t('General.descriptionPlaceholder')} />
					<FormControl.Message />
				</FormControl>
				<FormControl name="imageIds">
					<FormControl.Label>{t('General.images')}</FormControl.Label>
					<PhotoUpload initialImagesUrls={initialImageUrls} placeholder={t('General.descriptionPlaceholder')} />
				</FormControl>
			</Stack>
			<Box style={{ gridColumn: 'span 2' }}>
				<FormControl name="prices">
					<FormControl.Label>{t('General.price')}</FormControl.Label>
					<FormTable<ProductPrice>
						name="prices"
						columns={formTableColumns}
						defaultRow={{ minQuantity: undefined, price: undefined }}
						emptyMessage={t('General.noPricesAdded')}
						addButtonLabel={t('General.addRow')}
					/>
					<FormControl.Message />
				</FormControl>
			</Box>
			<Box style={{ gridColumn: 'span 2' }}>
				<FormControl name="productStates">
					<FormControl.Label>{t('Product.productStates')}</FormControl.Label>
					<ProductStateFormTable name="productStates" serviceLocations={serviceLocations} users={users} />
					<FormControl.Message />
				</FormControl>
			</Box>
			{servicesPrices && servicesPrices.length > 0 && (
				<Box style={{ gridColumn: 'span 2' }}>
					<Stack gap={5}>
						<div>
							<Button
								type="button"
								variant={showServices ? 'destructive' : 'success'}
								size="small"
								onClick={() => setShowServices(!showServices)}>
								{showServices ? t('General.stopCustomizingServicePrices') : t('General.customizeServicePrices')}
							</Button>
						</div>
						{servicesPrices.map((service, index) => {
							const fieldName = `servicePrices.${index}.prices`
							form.setValue(`servicePrices.${index}.serviceId`, service.serviceId)

							return (
								<Box
									key={service.serviceId}
									style={{ marginBottom: '1.5rem', display: showServices ? 'block' : 'none' }}>
									<FormControl name={fieldName}>
										<FormControl.Label>{service.serviceName}</FormControl.Label>
										<FormTable
											name={fieldName}
											columns={servicePriceFormTableColumns}
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

export default RentForm
