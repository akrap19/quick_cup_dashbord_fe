/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler } from 'react'

import { tokens } from 'style/theme.css'

import * as styles from './Radio.css'
import { Text } from '../../typography/text'

interface Props {
	name?: string
	label?: string
	value?: string
	checked?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Radio = ({ label, value, name, checked, onChange }: Props) => {
	const color = checked ? tokens.colors['primary.500'] : tokens.colors['shades.100']

	return (
		<label className={styles.radioWrapper}>
			<span className={styles.radioField}>
				<input
					type="radio"
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					className={styles.hiddenRadio}
				/>
				<div className={styles.radioDecorator} style={{ color }} />
				{checked && <div className={styles.checked} />}
			</span>
			<Text as="span" color="neutral.500">
				{label}
			</Text>
		</label>
	)
}
