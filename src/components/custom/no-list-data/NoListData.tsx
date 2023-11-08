'use client'
import { Box } from '@/components/layout/box'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'
import { Stack } from '@/components/layout/stack'
import { AddButton } from '../add-button/AddButton'

type NoListDataProps = { title: string; description: string; buttonLabel: string; buttonLink: string }

export const NoListData = ({ title, description, buttonLabel, buttonLink }: NoListDataProps) => {
	const t = useTranslations()

	return (
		<Box
			display="flex"
			align="center"
			justify="center"
			textAlign="center"
			color="neutral.900"
			style={{ width: '500px', marginTop: '20vh' }}>
			<Stack gap={6}>
				<Stack gap={4}>
					<Heading variant="h2" textTransform="capitalize" lineHeight="medium">
						{t(title)}
					</Heading>
					<Text lineHeight="xlarge">{t(description)}</Text>
				</Stack>
				<Box>
					<AddButton buttonLabel={t(buttonLabel)} buttonLink={buttonLink} />
				</Box>
			</Stack>
		</Box>
	)
}
