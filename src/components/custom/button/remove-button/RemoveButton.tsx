'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

import { MinusIcon } from '@/components/icons/minus-icon'
import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'

type RemoveButtonProps = { buttonLabel: string; buttonLink?: string; onClick?: MouseEventHandler<HTMLButtonElement> }

type Props = RemoveButtonProps &
	ButtonVariants &
	Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'disabled'>

export const RemoveButton = ({
	variant = 'destructive',
	size = 'large',
	type,
	buttonLabel,
	buttonLink,
	onClick
}: Props) => {
	const t = useTranslations()
	const { push } = useRouter()
	const onClickMethod = !buttonLink ? onClick : () => push(buttonLink)

	return (
		<Button type={type} variant={variant} size={size} onClick={onClickMethod}>
			<MinusIcon />
			{t(buttonLabel)}
		</Button>
	)
}
