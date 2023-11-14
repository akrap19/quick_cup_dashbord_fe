import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { useTranslations } from 'next-intl'
import { Text } from '@/components/typography/text'
import { ReactNode } from 'react'

interface FormItemsProps {
	primaryButtonLabel: string
	secondaryButtonLabel: string
	children: ReactNode[]
}

export const FormItems = ({ primaryButtonLabel, secondaryButtonLabel, children }: FormItemsProps) => {
	const t = useTranslations()

	return (
		<Stack gap={6}>
			<Text fontSize="small" color="destructive.500">
				{t('General.requiredFieldWarning')}
			</Text>
			<Columns gap={6}>
				{children?.map((m, i) => (
					<Columns.Item columns={6}>
						<Box paddingBottom={3}>{m}</Box>
					</Columns.Item>
				))}
			</Columns>
			<Divider />
			<Inline gap={4}>
				<Button variant="secondary">{t(secondaryButtonLabel)}</Button>
				<Button type="submit">{t(primaryButtonLabel)}</Button>
			</Inline>
		</Stack>
	)
}
