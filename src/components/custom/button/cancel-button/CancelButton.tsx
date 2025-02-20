'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'

type CustomProps = { customLabel?: string }

type Props = CustomProps & ButtonVariants

export const CancelButton = ({ customLabel, size }: Props) => {
	const t = useTranslations()
	const router = useRouter()

	const goBack = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		router.back()
	}

	return (
		<Button variant="secondary" onClick={goBack} size={size}>
			{t(customLabel ?? 'General.cancel')}
		</Button>
	)
}
