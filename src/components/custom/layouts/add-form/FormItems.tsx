'use client'

import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/inputs/button'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

interface Props {
	children: any
	openCancelDialog?: () => void
}

export const FormItems = ({ children, openCancelDialog }: Props) => {
	const t = useTranslations()
	const formContext = useFormContext()
	const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (openCancelDialog) {
			openCancelDialog()
		}
	}

	return (
		<Stack gap={6}>
			<Text fontSize="small" color="destructive.500">
				{t('General.requiredFieldWarning')}
			</Text>
			{children && children.length > 1 ? (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						columnGap: tokens.spacing[6],
						rowGap: tokens.spacing[8]
					}}>
					{children}
				</div>
			) : (
				children
			)}
			<Divider />
			<Inline gap={4}>
				<Button variant="secondary" onClick={handleCancel}>
					{t('General.cancel')}
				</Button>
				<Button type="submit" disabled={!formContext.formState.isValid}>
					{t(openCancelDialog ? 'General.save&Add' : 'General.saveChanges')}
				</Button>
			</Inline>
		</Stack>
	)
}
