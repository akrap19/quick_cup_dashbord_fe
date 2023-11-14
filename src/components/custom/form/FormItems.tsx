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
	children: ReactNode[]
}

export const FormItems = ({ children }: FormItemsProps) => {
	const t = useTranslations()

	return (
		<Stack gap={6}>
			<Text fontSize="small" color="destructive.500">
				{t('General.requiredFieldWarning')}
			</Text>
			<Columns gap={6}>
				{children?.map((m, i) => (
					<Columns.Item columns={6}>
						<Box paddingBottom={i < children.length - 2 ? 3 : 0}>{m}</Box>
					</Columns.Item>
				))}
			</Columns>
			<Divider />
			<Inline gap={4}>
				<Button variant="secondary">{t('General.cancel')}</Button>
				<Button type="submit">{t('General.save&Add')}</Button>
			</Inline>
		</Stack>
	)
}
