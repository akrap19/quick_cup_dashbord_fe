'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/inputs/button'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

export const CancelButton = () => {
	const t = useTranslations()
	const router = useRouter()

	const goBack = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		router.back()
	}

	return (
		<Button variant="secondary" onClick={goBack}>
			{t('General.cancel')}
		</Button>
	)
}
