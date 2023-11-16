'use client'
import { PencilIcon } from '@/components/icons/pencil-icon'
import { Button } from '@/components/inputs/button'
import { useTranslations } from 'next-intl'

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
