import { AudioIcon } from '@/components/icons/audio-icon'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import Image from 'next/image'

import * as styles from './MobilePreview.css'

export const MobilePreviewContent = () => {
	return (
		<Box className={styles.mobilePreviewContentContainer}>
			<Stack gap={3}>
				<Inline justifyContent="space-between" alignItems="center">
					<Text fontSize="xxbig" fontWeight="bold" lineHeight="medium" color="neutral.900">
						{'What after Barnahus?'}
					</Text>
					<AudioIcon size="xlarge" />
				</Inline>
				<Stack gap={3}>
					<Box borderRadius="small">
						<Image alt="mobile-preview" src="/images/mobile-preview-template.png" height={234} width={302} />
					</Box>
					<Inline justifyContent="space-around" gap={4}>
						<Box backgroundColor="primary.500" borderRadius="full" style={{ height: '12px', width: '12px' }} />
					</Inline>
				</Stack>
			</Stack>
		</Box>
	)
}
