/* eslint-disable no-undef */
import { tokens } from 'style/theme.css'

import { iconSlot, inputWrapper } from './InputWrapper.css'

interface Props {
	endIcon?: JSX.Element
	startIcon?: JSX.Element
	children: any
}

export const InputWrapper = ({ startIcon, endIcon, children }: Props) => {
	return (
		<div className={inputWrapper}>
			{startIcon && (
				<div className={iconSlot} style={{ left: tokens.spacing[3] }}>
					{startIcon}
				</div>
			)}
			{children}
			{endIcon && !children?.props.disabled && (
				<div className={iconSlot} style={{ right: tokens.spacing[2] }}>
					{endIcon}
				</div>
			)}
		</div>
	)
}
