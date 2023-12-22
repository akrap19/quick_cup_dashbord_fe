'use client'

import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/inputs/button'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

import { CancelButton } from '../../button/cancel-button'

interface Props {
	children: ReactNode[]
}

export const FormItems = ({ children }: Props) => {
	const t = useTranslations()
	const formContext = useFormContext()

	return (
		<Stack gap={6}>
			<Text fontSize="small" color="destructive.500">
				{t('General.requiredFieldWarning')}
			</Text>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)',
					columnGap: tokens.spacing[6],
					rowGap: tokens.spacing[8]
				}}>
				{children}
			</div>
			<Divider />
			<Inline gap={4}>
				<CancelButton />
				<Button type="submit" disabled={!formContext.formState.isValid}>
					{t('General.save&Add')}
				</Button>
			</Inline>
		</Stack>
	)
}
