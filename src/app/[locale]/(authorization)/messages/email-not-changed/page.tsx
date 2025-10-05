'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/inputs/button'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'
import { ROUTES } from 'parameters'

const EmailNotChangedPage = () => {
	const t = useTranslations()
	const { push } = useRouter()

	return (
		<>
			<Stack gap={3}>
				<Heading variant="h3" textTransform="uppercase" textAlign="center" whiteSpace="nowrap">
					{t('General.emailNotChanged')}
				</Heading>
				<Text fontSize="small" textAlign="center">
					{t('General.emailNotChangedDescription')}
				</Text>
			</Stack>
			<Button className={atoms({ width: '100%' })} onClick={() => push(ROUTES.HOME)}>
				{t('General.goToDashboard')}
			</Button>
		</>
	)
}

export default EmailNotChangedPage
