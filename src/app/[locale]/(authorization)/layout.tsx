'use client'

import { ReactNode } from 'react'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

const AuthorizationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box display="flex" width="100vw" justify="center" align="center">
			<Stack gap={8} alignItems="center">
				<BrandLogo />
				<Box
					backgroundColor="neutral.50"
					boxShadow="medium"
					padding={10}
					borderRadius="small"
					style={{ width: '456px' }}>
					<Stack gap={8} alignItems="center">
						{children}
					</Stack>
				</Box>
				{/* <Box style={{ width: '380px' }}>
					<Stack gap={2} alignItems="center">
						<Text fontSize="xsmall" textAlign="center">
							{t('General.euDisclaimer')}
						</Text>
						<Image
							src="/images/normal-reproduction-low-resolution.jpg"
							width={56.25}
							height={37.5}
							alt="uploadedPhoto"
						/>
					</Stack>
				</Box> */}
			</Stack>
		</Box>
	)
}

export default AuthorizationLayout
