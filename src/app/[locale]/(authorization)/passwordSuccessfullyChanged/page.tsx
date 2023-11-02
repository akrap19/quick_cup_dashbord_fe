'use client'
import { Heading } from '@/components/typography/heading'
import { Stack } from '@/components/layout/stack'
import { Button } from '@/components/inputs/button'
import { useTranslations } from 'next-intl'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'
import { useRouter } from 'next/navigation'
import { ROUTES } from 'parameters'

const PasswordSuccessfullyChangedPage = () => {
	const t = useTranslations()
	const { push } = useRouter()

	return (
		<>
			<Stack gap={3}>
				<Heading variant="h3" textTransform="uppercase" textAlign="center" whiteSpace="nowrap">
					{t('Authorization.PasswordSuccessfullyChanged.title')}
				</Heading>
				<Text fontSize="small" textAlign="center">
					{t('Authorization.PasswordSuccessfullyChanged.instructions')}
				</Text>
			</Stack>
			<Button className={atoms({ width: '100%' })} onClick={() => push(ROUTES.LOGIN)}>
				{t('Authorization.logIn')}
			</Button>
		</>
	)
}

export default PasswordSuccessfullyChangedPage
