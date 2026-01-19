'use client'

import { ComponentProps, ReactElement } from 'react'
import { useTranslations } from 'next-intl'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Button } from '@/components/inputs/button'
import { NumericInput } from '@/components/inputs/numeric-input'
import { TextInput } from '@/components/inputs/text-input'
import { Select } from '@/components/inputs/select'
import { PlusIcon } from '@/components/icons/plus-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/data-display/table/Table'
import { Text } from '@/components/typography/text'

export type InputType = 'text' | 'number' | 'decimal' | 'select'

export interface FormTableColumn<T = any> {
	key: string
	label: string
	type: InputType
	placeholder?: string
	optional?: boolean
	width?: string
	options?: Array<{ value: string; label: string }>
	transform?: (value: string | number | undefined) => any
	render?: (value: any, row: T, rowIndex: number, onChange: (value: any) => void) => ReactElement
}

interface Props<T = any> extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
	value?: T[]
	onChange?: (value: T[]) => void
	name?: string
	columns: FormTableColumn<T>[]
	defaultRow: T
	emptyMessage?: string
	addButtonLabel?: string
	showActions?: boolean
	errorMessage?: string
}

export const FormTable = <T extends Record<string, any> = Record<string, any>>({
	value = [],
	onChange,
	name,
	columns,
	defaultRow,
	emptyMessage,
	addButtonLabel,
	showActions = true,
	errorMessage,
	...rest
}: Props<T>) => {
	const t = useTranslations()
	const rows: T[] = value || []

	const addRow = () => {
		const newRows = [...rows, { ...defaultRow }]
		if (onChange) {
			onChange(newRows)
		}
	}

	const removeRow = (index: number) => {
		const newRows = rows.filter((_, i) => i !== index)
		if (onChange) {
			onChange(newRows)
		}
	}

	const updateRow = (index: number, key: string, val: any) => {
		const newRows = [...rows]
		if (val === undefined || val === null || val === '') {
			const { [key]: _, ...rest } = newRows[index]
			newRows[index] = rest as T
		} else {
			newRows[index] = { ...newRows[index], [key]: val }
		}
		if (onChange) {
			onChange(newRows)
		}
	}

	const renderInput = (column: FormTableColumn<T>, row: T, rowIndex: number) => {
		const fieldValue = row[column.key]

		if (column.render) {
			return column.render(fieldValue, row, rowIndex, (val: any) => updateRow(rowIndex, column.key, val))
		}

		const commonProps = {
			value: fieldValue?.toString() || '',
			placeholder: column.placeholder || '',
			style: { width: '100%', height: '2rem', padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
			onChange: (e: any) => {
				let newValue: any
				if (column.type === 'number') {
					newValue = e.target.value ? parseFloat(e.target.value) : undefined
				} else {
					newValue = e.target.value || undefined
				}

				if (column.transform) {
					newValue = column.transform(newValue)
				}

				updateRow(rowIndex, column.key, newValue)
			}
		}

		switch (column.type) {
			case 'number':
				return <NumericInput {...commonProps} />
			case 'decimal':
				return <NumericInput {...commonProps} decimalScale={10} />
			case 'select':
				return (
					<Select
						options={column.options || []}
						value={fieldValue?.toString() || ''}
						placeholder={column.placeholder || ''}
						style={{ width: '100%', height: '2rem', padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
						onChange={e => {
							const newValue = e.target.value || undefined
							if (column.transform) {
								const transformed = column.transform(newValue)
								updateRow(rowIndex, column.key, transformed)
							} else {
								updateRow(rowIndex, column.key, newValue)
							}
						}}
					/>
				)
			case 'text':
			default:
				return <TextInput {...commonProps} />
		}
	}

	const totalColumns = columns.length + (showActions ? 1 : 0)
	const actionsColumnWidth = 100
	const dataColumnWidth = columns.length > 0 ? `calc((100% - ${actionsColumnWidth}px) / ${columns.length})` : 'auto'

	return (
		<Stack gap={2}>
			<Table style={{ tableLayout: 'fixed' }}>
				<TableHeader>
					<TableRow>
						{columns.map(column => (
							<TableHead key={column.key} style={{ width: dataColumnWidth }}>
								{column.label}
							</TableHead>
						))}
						{showActions && <TableHead style={{ width: `${actionsColumnWidth}px` }}>Actions</TableHead>}
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index}>
							{columns.map(column => (
								<TableCell key={column.key} style={{ width: dataColumnWidth }}>
									{renderInput(column, row, index)}
								</TableCell>
							))}
							{showActions && (
								<TableCell style={{ textAlign: 'center' }}>
									<Button
										type="button"
										variant="adaptive"
										size="icon"
										onClick={() => removeRow(index)}
										disabled={rows.length === 1}>
										<TrashIcon size="large" color="destructive.500" />
									</Button>
								</TableCell>
							)}
						</TableRow>
					))}
					{rows.length === 0 && (
						<TableRow>
							<TableCell colSpan={totalColumns} style={{ textAlign: 'center', padding: '20px', height: '140px' }}>
								{emptyMessage || t('General.noRowsAdded')}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{errorMessage && (
				<Box paddingY={1}>
					<Text fontSize="small" color="destructive.500">
						{errorMessage}
					</Text>
				</Box>
			)}
			<Box>
				<Button type="button" size="small" variant="success" onClick={addRow}>
					<PlusIcon size="small" />
					{addButtonLabel || t('General.addRow')}
				</Button>
			</Box>
		</Stack>
	)
}
