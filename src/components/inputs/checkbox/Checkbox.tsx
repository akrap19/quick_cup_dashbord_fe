/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler } from 'react'

import { MinusIcon } from '@/components/icons/minus-icon'
import { tokens } from 'style/theme.css'

import * as styles from './Checkbox.css'
import CheckmarkIcon from './checkmark-icon.svg'
import { Text } from '../../typography/text'

interface Props {
	name?: string
	label?: string
	value?: any
	checked?: boolean
	indeterminate?: boolean
	disabled?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({ name, label, value, checked, indeterminate, disabled, onChange }: Props) => {
	const isChecked = checked ? checked : disabled ? !disabled : value
	const color = isChecked ? tokens.colors['primary.500'] : tokens.colors['shades.00']

	return (
		<label className={label && styles.checkboxWrapper}>
			<span className={styles.checkboxField} style={{ cursor: disabled ? 'default' : 'pointer' }}>
				<input
					type="checkbox"
					name={name}
					value={value}
					checked={isChecked}
					onChange={onChange}
					disabled={disabled}
					className={styles.hiddenCheckbox}
				/>
				<div className={styles.checkboxDecorator} style={{ color }} />
				<span className={styles.checked}>
					{isChecked && <CheckmarkIcon />}
					{indeterminate && <MinusIcon color="neutral.900" />}
				</span>
			</span>
			<Text as="span" fontWeight="semibold" fontSize="small" color="neutral.900">
				{label}
			</Text>
		</label>
	)
}
