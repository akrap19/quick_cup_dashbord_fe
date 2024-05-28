'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'

export const CancelButton = (props: ButtonVariants) => {
	const t = useTranslations()
	const router = useRouter()

	const goBack = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		router.back()
	}

	return (
		<Button variant="secondary" onClick={goBack} size={props?.size}>
			{t('General.cancel')}
		</Button>
	)
}
