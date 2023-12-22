'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

import { Button } from '@/components/inputs/button'

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
