'use client'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'
import { useTranslations } from 'next-intl'
import { AddButton } from '../add-button'
import { SearchInput } from '../search-input'

type DataTableHeaderProps = {
	buttonLabel: string
	buttonLink: string
	description?: string
	selectOptions?: any[]
	searchPlaceholder?: string
}

export const DataTableHeader = ({
	buttonLabel,
	buttonLink,
	description,
	selectOptions,
	searchPlaceholder
}: DataTableHeaderProps) => {
	const t = useTranslations()

	return (
		<Inline justifyContent="space-between" alignItems="center">
			{description && (
				<Box width="60%" style={{ maxWidth: '600px' }}>
					<Text fontSize="small" lineHeight="large" color="neutral.800">
						{t(description)}
					</Text>
				</Box>
			)}
			<Inline gap={4} alignItems="center">
				{selectOptions && (
					<Box style={{ width: '200px' }}>
						<Select
							name="dataTableSelect"
							style={{
								color: tokens.colors['neutral.500'],
								fontSize: tokens.typography.size.medium,
								fontWeight: tokens.typography.weight.semibold,
								lineHeight: tokens.typography.lineHeight.xlarge
							}}
							options={selectOptions}
							onSelect={() => {}}
						/>
					</Box>
				)}
				{searchPlaceholder && (
					<Box style={{ width: '320px' }}>
						<SearchInput placeholder={t(searchPlaceholder)} />
					</Box>
				)}
			</Inline>
			<AddButton buttonLabel={t(buttonLabel)} buttonLink={buttonLink} />
		</Inline>
	)
}
