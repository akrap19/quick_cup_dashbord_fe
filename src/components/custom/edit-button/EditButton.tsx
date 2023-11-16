'use client'

import { useTranslations } from 'next-intl'

import { PencilIcon } from '@/components/icons/pencil-icon'
import { Button } from '@/components/inputs/button'

type EditButtonProps = { buttonLabel: string; buttonLink: string }

export const EditButton = ({ buttonLabel, buttonLink }: EditButtonProps) => {
	const t = useTranslations()

	return (
		<Button variant="primary" href={buttonLink}>
			<PencilIcon color="shades.00" />
			{t(buttonLabel)}
		</Button>
	)
}
