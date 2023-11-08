'use client'
import { BlockIcon } from '@/components/icons/block-icon'
import { Button } from '@/components/inputs/button'
import { useTranslations } from 'next-intl'
import Plus from '@/components/icons/block-icon/assets/plus.svg'

type AddButtonProps = { buttonLabel: string; buttonLink: string }

export const AddButton = ({ buttonLabel, buttonLink }: AddButtonProps) => {
	const t = useTranslations()

	return (
		<Button variant="primary" href={buttonLink}>
			<BlockIcon icon={Plus} size="medium" />
			{t(buttonLabel)}
		</Button>
	)
}
