'use client'

import { useTranslations } from 'next-intl'

import { AddButton } from '@/components/custom/button/add-button'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Base } from 'api/models/common/base'

interface Props {
	languages: Base[]
	buttonLabel: string
	buttonLink: string
}

export const Inputs = ({ languages, buttonLabel, buttonLink }: Props) => {
	const t = useTranslations()

	return (
		<Inline justifyContent="space-between" alignItems="center">
			<Box position="relative" style={{ width: '300px' }}>
				<SearchDropdown placeholder="General.role" options={languages} />
			</Box>
			<AddButton size="medium" variant="secondary" buttonLabel={t(buttonLabel)} buttonLink={buttonLink} />
		</Inline>
	)
}
