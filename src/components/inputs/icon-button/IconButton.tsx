import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

import { IconButtonVariants, iconButton } from './IconButton.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & IconButtonVariants

export const IconButton = ({ variant = 'primary', size = 'large', className, children, ...rest }: Props) => (
	<button type="button" className={clsx(iconButton({ variant, size }), className)} {...rest}>
		{children}
	</button>
)
