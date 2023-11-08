/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/button-has-type */
import clsx from 'clsx'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

import { ButtonVariants, button } from './Button.css'

// Required props for both button and anchor
type RequiredProps = { children: ReactNode }
// When href prop is passed also allow other anchor attributes
type AnchorProps = { onClick?: never; href: string } & Pick<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'target' | 'rel' | 'className'
>
// When onClick prop is passed also allow other button attributes
type ButtonProps = { onClick?: MouseEventHandler<HTMLButtonElement>; href?: never } & Pick<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'type' | 'className' | 'disabled'
>
type Props = (AnchorProps | ButtonProps) & ButtonVariants & RequiredProps

export const Button = ({ variant = 'primary', size = 'large', href, className, ...rest }: Props) => {
	if (href) {
		return (
			<a
				href={href}
				className={clsx(button({ variant, size }), className)}
				style={{ textDecoration: 'none' }}
				{...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
			/>
		)
	}

	return (
		<button
			className={clsx(button({ variant, size }), className)}
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
		/>
	)
}
