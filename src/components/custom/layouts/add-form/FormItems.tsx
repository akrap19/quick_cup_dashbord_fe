import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { Button } from '@/components/inputs/button'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

interface Props {
	children: ReactNode[]
}

export const FormItems = ({ children }: Props) => {
	const t = useTranslations()

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
				<Button variant="secondary">{t('General.save&Add')}</Button>
				<Button type="submit">{t('General.cancel')}</Button>
			</Inline>
		</Stack>
	)
}
