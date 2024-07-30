/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/button-has-type */
import clsx from 'clsx'
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

import { MobilePreviewButtonVariants, mobilePreviewButton } from './MobilePreview.css'

type RequiredProps = { children: ReactNode }

type ButtonProps = { onClick?: MouseEventHandler<HTMLButtonElement>; href?: never } & Pick<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'type' | 'className' | 'disabled'
>

type Props = ButtonProps & MobilePreviewButtonVariants & RequiredProps

export const MobilePreviewButton = ({ variant = 'primary', className, ...rest }: Props) => {
	return (
		<button
			type="button"
			className={clsx(mobilePreviewButton({ variant }), className)}
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
		/>
	)
}
