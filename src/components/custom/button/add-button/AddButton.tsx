'use client'

import { useTranslations } from 'next-intl'

import PlusIcon from '@/components/icons/block-icon/assets/plus-icon.svg'
import { Button } from '@/components/inputs/button'

type AddButtonProps = { buttonLabel: string; buttonLink: string }

export const AddButton = ({ buttonLabel, buttonLink }: AddButtonProps) => {
	const t = useTranslations()

	return (
		<Button variant="primary" href={buttonLink}>
			<PlusIcon />
			{t(buttonLabel)}
		</Button>
	)
}
