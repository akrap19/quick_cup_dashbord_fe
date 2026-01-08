'use client'

import { useMemo, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { FormTable, FormTableColumn } from '@/components/custom/form-table'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { ProductState } from 'api/models/products/productState'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'
import { ProductStateLocationEnum } from 'enums/productStateLocationEnum'
import { Base } from 'api/models/common/base'

interface Props {
	name?: string
	value?: ProductState[]
	onChange?: (value: ProductState[]) => void
	serviceLocations: Base[]
	users: Base[]
}

export const ProductStateFormTable = ({ name, value, onChange, serviceLocations, users }: Props) => {
	const t = useTranslations()
	const form = useFormContext()
	const {
		formState: { errors }
	} = form
	const watchedValue = useWatch({ control: form.control, name: name || '' })
	const productStates = value || watchedValue || []

	// Create onChange handler that updates form when name is provided
	const handleChange = (newValue: ProductState[]) => {
		if (onChange) {
			onChange(newValue)
		} else if (name) {
			form.setValue(name, newValue, { shouldValidate: false })
		}
	}

	// Initialize with one empty row if empty
	useEffect(() => {
		if (name && (!productStates || productStates.length === 0)) {
			form.setValue(name, [{} as ProductState], { shouldValidate: false })
		}
	}, [name, form])

	// Clear opposite field when location changes
	useEffect(() => {
		if (Array.isArray(productStates)) {
			productStates.forEach((state, index) => {
				if (state?.location === ProductStateLocationEnum.SERVICE && state?.userId) {
					form.setValue(`${name}.${index}.userId`, undefined)
				} else if (state?.location === ProductStateLocationEnum.USER && state?.serviceLocationId) {
					form.setValue(`${name}.${index}.serviceLocationId`, undefined)
				}
			})
		}
	}, [productStates, name, form])

	const statusOptions = useMemo(
		() =>
			Object.values(ProductStateStatusEnum).map(value => ({
				id: value,
				name: `Product.${value}`
			})),
		[]
	)

	const locationOptions = useMemo(
		() =>
			Object.values(ProductStateLocationEnum).map(value => ({
				id: value,
				name: `Product.${value}`
			})),
		[]
	)

	const formTableColumns: FormTableColumn<ProductState>[] = useMemo(
		() => [
			{
				key: 'status',
				label: t('General.status'),
				type: 'text',
				placeholder: t('General.statusPlaceholder'),
				render: (value, row, rowIndex, onChange) => {
					const fieldName = `${name}.${rowIndex}.status`
					return (
						<SearchDropdown
							name={fieldName}
							options={statusOptions}
							placeholder={''}
							value={row.status || null}
							alwaysShowSearch={statusOptions.length > 5}
						/>
					)
				}
			},
			{
				key: 'location',
				label: t('General.location'),
				type: 'text',
				placeholder: t('General.locationPlaceholder'),
				render: (value, row, rowIndex, onChange) => {
					const fieldName = `${name}.${rowIndex}.location`
					return (
						<SearchDropdown
							name={fieldName}
							options={locationOptions}
							placeholder={''}
							value={row.location || null}
							alwaysShowSearch={locationOptions.length > 5}
						/>
					)
				}
			},
			{
				key: 'holder',
				label: t('General.holder'),
				type: 'text',
				placeholder: t('General.select'),
				render: (value, row, rowIndex, onChange) => {
					const location = row.location
					const isServiceLocation = location === ProductStateLocationEnum.SERVICE
					const isUserLocation = location === ProductStateLocationEnum.USER
					const isDisabled = !location

					// Get the appropriate options based on location
					const options = isServiceLocation ? serviceLocations : isUserLocation ? users : []
					// Determine which field to update (serviceLocationId or userId)
					const fieldToUpdate = isServiceLocation ? 'serviceLocationId' : 'userId'
					const currentValue = isServiceLocation ? row.serviceLocationId : row.userId
					const fieldName = `${name}.${rowIndex}.${fieldToUpdate}`

					return (
						<SearchDropdown
							name={fieldName}
							options={options}
							placeholder={''}
							value={currentValue || null}
							disabled={isDisabled}
							alwaysShowSearch={options?.length > 5}
						/>
					)
				}
			},
			{
				key: 'quantity',
				label: t('General.quantity'),
				type: 'number',
				placeholder: t('General.quantityPlaceholder'),
				transform: (val: any) => (val !== undefined && val !== null && val !== '' ? Number(val) : 0)
			}
		],
		[t, statusOptions, locationOptions, serviceLocations, users, name, form]
	)

	const hasErrors = (errors?.products as any)?.length > 0 ? t('ValidationMeseges.productStateError') : undefined

	return (
		<FormTable<ProductState>
			name={name}
			value={productStates}
			onChange={handleChange}
			columns={formTableColumns}
			defaultRow={{} as ProductState}
			emptyMessage={t('General.noRowsAdded')}
			addButtonLabel={t('General.addRow')}
			errorMessage={hasErrors}
		/>
	)
}
