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
	const borderColor = checked ? tokens.colors['primary.500'] : tokens.colors['neutral.500']

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
				<div className={styles.radioDecorator} style={{ borderColor }} />
				{checked && <div className={styles.checked} />}
			</span>
			<Text as="span" color={checked ? 'primary.500' : 'neutral.500'} fontWeight="semibold" lineHeight="small">
				{label}
			</Text>
		</label>
	)
}
