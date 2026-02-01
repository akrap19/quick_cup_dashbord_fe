'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

import * as styles from './Tooltip.css'

interface TooltipProps {
	children: ReactNode
	content: string | ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = ({ children, content, side = 'top' }: TooltipProps) => {
	const getSideClass = () => {
		switch (side) {
			case 'bottom':
				return styles.tooltipBottom
			case 'left':
				return styles.tooltipLeft
			case 'right':
				return styles.tooltipRight
			default:
				return ''
		}
	}

	return (
		<div className={styles.tooltipWrapper}>
			{children}
			<div className={clsx(styles.tooltipContent, getSideClass())} role="tooltip">
				{content}
			</div>
		</div>
	)
}

