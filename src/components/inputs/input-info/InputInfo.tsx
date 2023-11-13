import { ReactNode, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import InfoIcon from '@/components/icons/block-icon/assets/info-icon.svg'
import { Inline } from '@/components/layout/inline'
import { Button } from '../button'
import { Box } from '@/components/layout/box'
import { Text } from 'components/typography/text'
import { useTranslations } from 'next-intl'

interface Props {
	children: ReactNode
	infoText: string
}

export const InputInfo = ({ children, infoText }: Props) => {
	const t = useTranslations()
	const [isInfoVisible, setInfoVisible] = useState(false)

	return (
		<Inline gap={4} alignItems="center">
			{children}
			<Button onClick={() => setInfoVisible(!isInfoVisible)} variant="adaptive" size="auto">
				<BlockIcon icon={InfoIcon} color="neutral.900" />
			</Button>
			{isInfoVisible && (
				<Box
					style={{ width: '16rem' }}
					position="absolute"
					padding={2}
					backgroundColor="neutral.500"
					borderRadius="small"
					marginLeft={32}
					marginBottom={22}>
					<Text color="shades.00" textTransform="none" fontSize="small">
						{t(infoText)}
					</Text>
				</Box>
			)}
		</Inline>
	)
}
