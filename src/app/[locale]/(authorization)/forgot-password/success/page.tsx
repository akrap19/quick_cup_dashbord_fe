'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'
import { forgotPassword } from 'api/services/auth'

const SuccessPage = () => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const [countdown, setCountdown] = useState<number>(30)
	const email = searchParams.get('email') ? decodeURIComponent(searchParams.get('email')!) : null

	const onSubmit = async (e: any) => {
		e.preventDefault()
		e.stopPropagation()

		console.log('Matijaaaaaaaa email 666666', email)
		if (email) {
			const result = await forgotPassword(email)

			if (result?.message === 'OK') {
				setCountdown(30)
			}
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(prevCountdown => (prevCountdown === 0 ? prevCountdown : prevCountdown - 1))
		}, 1000)

		// Clean up the interval on component unmount
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<>
			<Stack gap={3}>
				<Heading variant="h3" textTransform="uppercase" textAlign="center">
					{t('Authorization.ForgotPassword.successTitle')}
				</Heading>
				<Box textAlign="center">
					<Text as="span" fontSize="small">
						{t('Authorization.ForgotPassword.successInstructions1')}
					</Text>
					<Text as="span" fontSize="small" fontWeight="semibold">
						{email}
					</Text>
					<Text as="span" fontSize="small">
						{t('Authorization.ForgotPassword.successInstructions2')}
					</Text>
				</Box>
				<Text fontSize="small" textAlign="center">
					{t('Authorization.ForgotPassword.resendInstructions')}
				</Text>
			</Stack>
			<form className={atoms({ width: '100%' })} onSubmit={onSubmit}>
				<Stack>
					<Button size="large" type="submit" disabled={email === null || countdown !== 0}>
						{countdown === 0 ? t('Authorization.ForgotPassword.resend') : countdown}
					</Button>
				</Stack>
			</form>
		</>
	)
}

export default SuccessPage
