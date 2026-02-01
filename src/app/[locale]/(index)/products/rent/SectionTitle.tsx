'use client'

import { useTranslations } from 'next-intl'
import { Heading } from '@/components/typography/heading'

interface Props {
	translationKey: string
}

export const SectionTitle = ({ translationKey }: Props) => {
	const t = useTranslations()

	return (
		<Heading variant="h4" color="neutral.900">
			{t(translationKey)}
		</Heading>
	)
}
