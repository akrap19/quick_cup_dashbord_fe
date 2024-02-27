'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

type Props = { size: 'small' | 'large'; noResoultMessage: string }

export const NoResult = ({ size, noResoultMessage }: Props) => {
	const t = useTranslations()
	const noResultSizes =
		size === 'small' ? { paddingY: 2, width: 164, height: 100 } : { paddingY: 6, width: 264, height: 180 }

	return (
		<Box
			backgroundColor="shades.00"
			width="100%"
			display="flex"
			justifyContent="center"
			paddingY={noResultSizes.paddingY as any}>
			<Stack gap={1}>
				<Box width="100%" display="flex" alignItems="center" justifyContent="center">
					<Image
						src="/images/no-data-found.svg"
						alt="noDataFound"
						width={noResultSizes.width}
						height={noResultSizes.height}
					/>
				</Box>
				<Box display="flex" justify="center">
					<Text fontStyle="italic" lineHeight="xlarge" color="neutral.700">
						{t(noResoultMessage)}
					</Text>
				</Box>
			</Stack>
		</Box>
	)
}
