'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

import PlusIcon from '@/components/icons/block-icon/assets/plus-icon.svg'
import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'

type AddButtonProps = { buttonLabel: string; buttonLink?: string; onClick?: MouseEventHandler<HTMLButtonElement> }

type Props = AddButtonProps &
	ButtonVariants &
	Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'disabled'>

export const AddButton = ({ variant = 'primary', size = 'large', type, buttonLabel, buttonLink, onClick }: Props) => {
	const t = useTranslations()
	const { push } = useRouter()
	const onClickMethod = !buttonLink ? onClick : () => push(buttonLink)

	return (
		<Button type={type} variant={variant} size={size} onClick={onClickMethod}>
			<PlusIcon />
			{t(buttonLabel)}
		</Button>
	)
}
