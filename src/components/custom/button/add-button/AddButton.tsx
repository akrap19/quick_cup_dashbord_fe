'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import PlusIcon from '@/components/icons/block-icon/assets/plus-icon.svg'
import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'

type AddButtonProps = { buttonLabel: string; buttonLink: string }

type Props = AddButtonProps & ButtonVariants

export const AddButton = ({ variant = 'primary', size = 'large', buttonLabel, buttonLink }: Props) => {
	const t = useTranslations()
	const { push } = useRouter()

	return (
		<Button variant={variant} size={size} onClick={() => push(buttonLink)}>
			<PlusIcon />
			{t(buttonLabel)}
		</Button>
	)
}
