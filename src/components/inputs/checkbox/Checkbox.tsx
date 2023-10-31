/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler } from 'react'

import { tokens } from 'style/theme.css'

import * as styles from './Checkbox.css'
import CheckmarkIcon from './checkmark-icon.svg'
import { Text } from '../../typography/text'

interface Props {
	name?: string
	label?: string
	value?: string
	checked?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({ name, label, value, checked, onChange }: Props) => {
	const color = checked ? tokens.colors['primary.500'] : tokens.colors['shades.00']

	return (
		<label className={styles.checkboxWrapper}>
			<span className={styles.checkboxField}>
				<input
					type="checkbox"
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					className={styles.hiddenCheckbox}
				/>
				<div className={styles.checkboxDecorator} style={{ color }} />
				{checked && (
					<span className={styles.checked}>
						<CheckmarkIcon />
					</span>
				)}
			</span>
			<Text as="span" fontWeight="semibold" fontSize="small" color="neutral.900">
				{label}
			</Text>
		</label>
	)
}
